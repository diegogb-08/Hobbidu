import { useActionData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { register } from '~/services/user.server'
import AuthContainer from '~/components/Layouts/AuthContainer'
import GoogleButton from '~/components/Buttons/GoogleButton'
import { authenticator } from '~/services/auth.server'
import { ActionValue } from '~/types/types'

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = new Request(request)
  const response = await register(request)
  if (response) {
    return await authenticator.authenticate(ActionValue.STANDARD, clonedRequest, {
      successRedirect: '/'
    })
  }
  return response
}

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
}

const Register = () => {
  const actionData = useActionData<typeof action>()

  return (
    <AuthContainer buttonGroup={<GoogleButton />}>
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
    </AuthContainer>
  )
}

export default Register
