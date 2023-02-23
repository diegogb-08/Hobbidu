import { db } from '~/utils/db.server'
import { json } from '@remix-run/node'
import { SECRET } from './constants'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import type { Errors } from '~/types/types'
import { getParams } from 'remix-params-helper'
import { z } from 'zod'
import invariant from 'tiny-invariant'

export enum SessionErrorKey {
  WrongFieldType = 'wrong_field_type',
  MissingSecret = 'missing_secret',
  IncorrectDetails = 'incorrect_details'
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

export const isUserValidated = async (email: string, password: string) => {
  const userIsValidated = false
  try {
    const user = await db.user.findUnique({
      where: {
        email
      }
    })
    if (user) {
      return await bcrypt.compare(password, user.password)
    }
    return userIsValidated
  } catch (error) {
    console.error({ error })
    return userIsValidated
  }
}

export const login = async (formData: FormData) => {
  const result = getParams(formData, LoginSchema)

  if (!result.success) {
    console.error(result.errors)
    throw result.errors
  }
  invariant(SECRET, 'no client secret found')
  const { email, password } = result.data

  const user = await db.user.findUnique({
    where: {
      email
    }
  })
  if (user) {
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('Password is incorrect')
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
  throw new Error('User not found')
}

type NewUser = z.infer<typeof CreateUserSchema>

export const register = async ({ email, name, user_name, password }: NewUser) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await db.user.create({
      data: { name, user_name, email, password: hashedPassword }
    })
  } catch (error) {
    console.error(error)
  }
}

export const validate = (error: SessionErrorKey) => {
  console.log(error)
  switch (error) {
    case SessionErrorKey.IncorrectDetails:
      return json<{ error: Errors }>({
        error: {
          message: 'The Email or Password does not exist or is incorrect',
          email: 'Email does not exist',
          password: 'Password is incorrect'
        }
      })
    case SessionErrorKey.MissingSecret:
      throw new Error('Secret is missing')
    case SessionErrorKey.WrongFieldType:
      throw new Error('Fields should be a string')

    default:
      return error
  }
}
