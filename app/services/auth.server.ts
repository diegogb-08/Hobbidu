import { Authenticator } from 'remix-auth'
import { sessionStorage } from '~/services/session.server'
import { FormStrategy } from 'remix-auth-form'
import { GoogleStrategy, SocialsProvider } from 'remix-auth-socials'

import { db } from '~/utils/db.server'

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_URL } from './constants'
import invariant from 'tiny-invariant'
import { login } from './user.server'
import type { UserAuth } from '~/types/types'
import { AuthStrategy } from '~/types/types'

export const authenticator = new Authenticator<UserAuth>(sessionStorage, {
  sessionErrorKey: 'sessionErrorKey',
  sessionKey: 'sessionKey',
  throwOnError: true
})

invariant(GOOGLE_CLIENT_ID, 'Missing Google client id.')
invariant(GOOGLE_CLIENT_SECRET, 'Missing Google client secret.')
invariant(CALLBACK_URL, 'Missing Google redirect uri.')

authenticator
  .use(
    new FormStrategy(async ({ form }) => {
      return await login(form)
    }),
    AuthStrategy.STANDARD
  )
  .use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        scope: ['openid', 'email', 'profile'],
        callbackURL: `${CALLBACK_URL}/auth/${SocialsProvider.GOOGLE}/callback`
      },
      async ({ profile, accessToken }) => {
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
    AuthStrategy.GOOGLE
  )
