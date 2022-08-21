// app/services/auth.server.ts
import type { User } from '@prisma/client'
import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import { FormStrategy } from 'remix-auth-form'
import { GoogleStrategy } from 'remix-auth-google'

import { db } from '~/utils/db.server'
import bcrypt from 'bcryptjs'
import { abort } from 'node:process'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, SECRET } from './constants'
import * as jwt from 'jsonwebtoken'
import { json } from '@remix-run/node'
import type { TypedResponse } from '@remix-run/server-runtime'
import invariant from 'tiny-invariant'

export const authenticator = new Authenticator<{ user: User; token: string } | TypedResponse<{ errors: ActionData }>>(
  sessionStorage
)

type ActionData =
  | {
      email: undefined | string
      password: undefined | string
    }
  | undefined

const login = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  let errors: ActionData = {
    email: email ? undefined : 'Email is required',
    password: password ? undefined : 'Password is required'
  }
  const hasErrors = Object.values(errors).some(Boolean)
  if (hasErrors) {
    return json<{ errors: ActionData }>({ errors })
  }

  if (typeof email === 'string' && typeof password === 'string') {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })
    errors = {
      email: user ? undefined : 'Email does not exist',
      password: user && !(await bcrypt.compare(password, user.password)) ? undefined : 'Password incorrect'
    }
    if (hasErrors) {
      return json<{ errors: ActionData }>({ errors })
    }
    const payload = {
      user,
      tokenCreationDate: new Date()
    }
    if (!SECRET) throw new Error('Missing Secret word.')

    const token = jwt.sign(payload, SECRET, {
      expiresIn: '1w'
    })
    invariant(user, 'User was not found')
    return { user, token }
  }
  return abort()
}

if (!GOOGLE_CLIENT_ID) throw new Error('Missing Google client id.')
if (!GOOGLE_CLIENT_SECRET) throw new Error('Missing Google client secret.')
if (!GOOGLE_CALLBACK_URL) throw new Error('Missing Google redirect uri.')

// Tell the Authenticator to use the form strategy
authenticator
  .use(
    new FormStrategy(async ({ form: formData }) => {
      return await login(formData)
    }),
    'standard'
  )
  .use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
      },
      async ({ accessToken, profile }) => {
        const user = await db.user.findUnique({
          where: {
            email: profile.emails[0].value
          }
        })
        if (user) {
          return { user, token: accessToken }
        } else {
          const { givenName, middleName, familyName } = profile.name
          const newUser = await db.user.create({
            data: {
              name: `${givenName} ${middleName} ${familyName}`,
              user_name: profile.displayName,
              email: profile.emails[0].value,
              password: accessToken,
              profile_img: profile.photos[0].value
            }
          })
          return { user: newUser, token: accessToken }
        }
      }
    ),
    'google'
  )
