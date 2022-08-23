import { db } from '~/utils/db.server'
import { json } from '@remix-run/node'
import { SECRET } from './constants'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { AuthorizationError } from 'remix-auth'
import { getSession } from './session.server'
import type { TypedResponse } from '@remix-run/server-runtime'
import type { Validation } from '~/types/types'

export enum SessionErrorKey {
  EmptyFields = 'empty_fields',
  IncorrectFields = 'incorrect_fields',
  WrongFieldType = 'wrong_field_type',
  MissingSecret = 'missing_secret',
  IncorrectDetails = 'incorrect_details',
  UniqueFieldsRequired = 'unique_fields_required'
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

  if (!name || !user_name || !email || !password) {
    throw new Error(SessionErrorKey.EmptyFields)
  }

  if (
    typeof name !== 'string' ||
    typeof user_name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    throw new TypeError(SessionErrorKey.WrongFieldType)
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await db.user.create({
      data: { name, user_name, email, password: hashedPassword }
    })
  } catch {
    throw new Error(SessionErrorKey.UniqueFieldsRequired)
  }
}

export const validate = async (request: Request, error?: string): Promise<TypedResponse<Validation> | null> => {
  const clonedRequest = new Request(request)
  const session = await getSession(request.headers.get('Cookie'))
  const sessionErrorKey: { message: SessionErrorKey } | undefined = session.get('sessionErrorKey')
  const formData = await clonedRequest.formData()
  const formValues = {
    name: formData.get('name') as string,
    user_name: formData.get('user_name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  switch (error || sessionErrorKey?.message) {
    case SessionErrorKey.EmptyFields:
      return json<Validation>({
        errors: {
          email: formValues.email ? undefined : 'Email cannot be empty',
          name: formValues.name ? undefined : 'Name cannot be empty',
          password: formValues.password ? undefined : 'Password cannot be empty',
          user_name: formValues.user_name ? undefined : 'User Name cannot be empty'
        },
        values: formValues
      })
    case SessionErrorKey.IncorrectDetails:
    case SessionErrorKey.IncorrectFields:
      return json<Validation>({
        errors: {
          email: 'Email does not exist',
          password: 'Password is incorrect'
        },
        values: formValues
      })
    case SessionErrorKey.UniqueFieldsRequired:
      return json<Validation>({
        errors: {
          email: 'This email already exist',
          user_name: 'This user name already exist'
        },
        values: formValues
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
