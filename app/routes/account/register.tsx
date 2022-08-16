import { Form, useActionData } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { db } from '~/utils/db.server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import bcrypt from 'bcryptjs'

type ActionData =
  | {
      name: undefined | string
      user_name: undefined | string
      email: undefined | string
      password: undefined | string
    }
  | undefined

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  console.log({ formData })
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
    console.log({ user })
    return { values: formData }
  } catch (error) {
    console.error(error)
    if (error instanceof PrismaClientKnownRequestError) {
      const [, message, location] = error.message.split(':')
      return message + location
    }
    return json<{ errors: ActionData }>({ errors })
  }
}

const Register = () => {
  const actionData = useActionData<typeof action>()

  console.log(actionData)
  return (
    <Form method='post' action='/account/register' className='flex flex-1 flex-col items-center justify-center'>
      <h2 className='text-4xl text-center'>Register</h2>
      <div className='h-8' />
      <TextField
        text='Full Name'
        placeholder='Diego Garcia Brisa'
        type='text'
        name='name'
        defaultValue={actionData?.name}
        isError={!!actionData?.errors?.name}
        helperText={actionData?.errors?.name}
      />
      <div className='h-8' />
      <TextField
        text='User Name'
        placeholder='Diego.08'
        type='text'
        name='user_name'
        defaultValue={actionData?.user_name}
        isError={!!actionData?.errors?.user_name}
        helperText={actionData?.errors?.user_name}
      />
      <div className='h-8' />
      <TextField
        text='Email'
        placeholder='email@email.com'
        type='email'
        name='email'
        defaultValue={actionData?.email}
        isError={!!actionData?.errors?.email}
        helperText={actionData?.errors?.email}
      />
      <div className='h-8' />
      <TextField
        text='Password'
        type='password'
        name='password'
        defaultValue={actionData?.password}
        isError={!!actionData?.errors?.password}
        helperText={actionData?.errors?.password}
      />
      <div className='h-8' />
      <SubmitButton />
    </Form>
  )
}

export default Register
