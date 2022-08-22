import { db } from '~/utils/db.server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { json } from '@remix-run/node'
import { SECRET } from './constants'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import type { ActionData } from '~/types/types'
import { AuthorizationError } from 'remix-auth'
import { getSession } from './session.server'

export enum SessionErrorKey {
  EmptyFields = 'empty_fields',
  IncorrectFields = 'incorrect_fields',
  WrongFieldType = 'wrong_field_type',
  MissingSecret = 'missing_secret',
  IncorrectDetails = 'incorrect_details'
}

export const login = async (formData: FormData) => {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    throw new AuthorizationError(SessionErrorKey.EmptyFields)
  }

  if (!SECRET) {
    throw new AuthorizationError(SessionErrorKey.MissingSecret)
  }

  if (typeof email === 'string' && typeof password === 'string') {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthorizationError(SessionErrorKey.IncorrectDetails)
    }
    const payload = {
      user,
      tokenCreationDate: new Date()
    }

    const token = jwt.sign(payload, SECRET, {
      expiresIn: '1w'
    })
    return { user, token }
  }
  throw new AuthorizationError(SessionErrorKey.WrongFieldType)
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

export const validateLogin = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'))
  const sessionErrorKey: { message: SessionErrorKey } | undefined = session.get('sessionErrorKey')
  switch (sessionErrorKey?.message) {
    case SessionErrorKey.EmptyFields:
      return json<{ errors: ActionData }>({
        errors: {
          email: 'Email is required',
          password: 'Password is required'
        }
      })
    case SessionErrorKey.IncorrectDetails:
    case SessionErrorKey.IncorrectFields:
      return json<{ errors: ActionData }>({
        errors: {
          email: 'Email not found',
          password: 'Password is incorrect'
        }
      })
    case SessionErrorKey.MissingSecret:
      throw new Error('Secret is missing')
    case SessionErrorKey.WrongFieldType:
      throw new Error('Fields should be a string')

    default:
      // eslint-disable-next-line unicorn/no-null
      return null
  }
}
