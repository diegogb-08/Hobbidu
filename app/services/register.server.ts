import { db } from '~/utils/db.server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import bcrypt from 'bcryptjs'
import { json, redirect } from '@remix-run/node'

type ActionData =
  | {
      name: undefined | string
      user_name: undefined | string
      email: undefined | string
      password: undefined | string
    }
  | undefined

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
    const user = await db.user.create({
      data: { name, user_name, email, password: hashedPassword }
    })
    if (user) return redirect('/account/login')
  } catch (error) {
    console.error(error)
    if (error instanceof PrismaClientKnownRequestError) {
      const [, message, location] = error.message.split(':')
      return { error, message: message + location }
    }
    return json<{ errors: ActionData }>({ errors })
  }
}
