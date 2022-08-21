import { Form, useActionData } from '@remix-run/react'
import type { ActionFunction } from '@remix-run/node'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { register } from '~/services/register.server'

export const action: ActionFunction = async ({ request }) => {
  return await register(request)
}

const Register = () => {
  const actionData = useActionData<typeof action>()

  console.log({ actionData })
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
