import { db } from '~/utils/db.server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { SECRET } from './constants'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { abort } from 'node:process'

export type ActionData =
  | {
      email?: string
      password?: string
    }
  | {
      name: undefined | string
      user_name: undefined | string
      email: undefined | string
      password: undefined | string
    }
  | undefined

export const login = async (formData: FormData) => {
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
    try {
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

      invariant(SECRET, 'Missing Secret word.')
      const token = jwt.sign(payload, SECRET, {
        expiresIn: '1w'
      })
      invariant(user, 'User was not found')
      return { user, token }
    } catch (error) {
      console.error(error)
      errors = {
        email: 'Email does not exist',
        password: 'Password incorrect'
      }
      return json<{ errors: ActionData }>({ errors })
    }
  }
  return abort()
}

export const register = async (request: Request) => {
  const formData = await request.formData()
  const name = formData.get('name')
  const user_name = formData.get('user_name')
  const email = formData.get('email')
  const password = formData.get('password')

  const errors: ActionData = {
    name: name ? undefined : 'Full name is required',
    user_name: user_name ? undefined : 'User name is required',
    email: email ? undefined : 'Email is required',
    password: password ? undefined : 'Password is required'
  }

  const hasErrors = Object.values(errors).some(Boolean)
  if (hasErrors) {
    return json<{ errors: ActionData }>({ errors })
  }

  if (
    typeof name !== 'string' ||
    typeof user_name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    throw new TypeError(`Form submitted incorrectly!`)
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await db.user.create({
      data: { name, user_name, email, password: hashedPassword }
    })
  } catch (error) {
    console.error(error)
    if (error instanceof PrismaClientKnownRequestError) {
      const [, message, location] = error.message.split(':')
      return { error, message: message + location }
    }
    return json<{ errors: ActionData }>({ errors })
  }
}
