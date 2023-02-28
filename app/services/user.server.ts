import { db } from '~/utils/db.server'
import { SECRET } from './constants'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { getParams } from 'remix-params-helper'
import { z } from 'zod'
import invariant from 'tiny-invariant'
import type { NewUser } from '~/routes/account/register'
import { UserSchema } from '~/types/types'

export enum SessionErrorKey {
  WrongFieldType = 'wrong_field_type',
  MissingSecret = 'missing_secret',
  IncorrectDetails = 'incorrect_details'
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
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
    },
    include: {
      hobbies: true
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
    const parsedUser = UserSchema.parse(user)
    return { user: parsedUser, token }
  }
  throw new Error('User not found')
}

export const isUserRegistered = async ({ email, user_name, password }: NewUser) => {
  let isRegistered = false
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.user.create({
      data: {
        user_name,
        email,
        password: hashedPassword,
        hobbyIDs: []
      }
    })
    if (user) {
      isRegistered = true
      return isRegistered
    }
    return isRegistered
  } catch (error) {
    console.error({ error })
    return isRegistered
  }
}
