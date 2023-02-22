import { db } from '~/utils/db.server'
import { json } from '@remix-run/node'
import { SECRET } from './constants'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { AuthorizationError } from 'remix-auth'
import type { Validation } from '~/types/types'
import type { User } from '@prisma/client'
import { getParams } from 'remix-params-helper'
import { z } from 'zod'

export enum SessionErrorKey {
  EmptyFields = 'empty_fields',
  IncorrectFields = 'incorrect_fields',
  WrongFieldType = 'wrong_field_type',
  MissingSecret = 'missing_secret',
  IncorrectDetails = 'incorrect_details',
  UniqueFieldsRequired = 'unique_fields_required'
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const CreateUserSchema = LoginSchema.extend({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  user_name: z.string().min(5).max(16)
})

export const login = async (formData: FormData) => {
  const result = getParams(formData, LoginSchema)

  if (!result.success) {
    console.error(result.errors)
    throw result.errors
  }

  if (!SECRET) {
    throw new AuthorizationError(SessionErrorKey.MissingSecret)
  }
  const { email, password } = result.data

  try {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })
    if (user) {
      if (!(await bcrypt.compare(password, user.password))) {
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
  } catch {
    throw new AuthorizationError(SessionErrorKey.IncorrectDetails)
  }
}

type NewUser = z.infer<typeof CreateUserSchema>

export const register = async ({ email, name, user_name, password }: NewUser): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await db.user.create({
      data: { name, user_name, email, password: hashedPassword }
    })
  } catch {
    throw new Error(SessionErrorKey.UniqueFieldsRequired)
  }
}

export const validate = (error: string | SessionErrorKey | undefined, formData?: FormData) => {
  const formValues = {
    name: formData ? formData?.get('name') : undefined,
    user_name: formData ? formData?.get('user_name') : undefined,
    email: formData ? formData?.get('email') : undefined,
    password: formData ? formData?.get('password') : undefined
  }

  switch (error) {
    case SessionErrorKey.EmptyFields:
      return json<Validation>({
        errors: {
          emptyFields: true,
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
          message: 'The Email or Password does not exist or is incorrect',
          email: 'Email does not exist',
          password: 'Password is incorrect'
        },
        values: formValues
      })
    case SessionErrorKey.UniqueFieldsRequired:
      return json<Validation>({
        errors: {
          message: 'The Email or User Name already exist',
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
      return null
  }
}
