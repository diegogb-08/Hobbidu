import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { ActionValue } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = new Request(request)
  const formData = await clonedRequest.formData()
  const _action = formData.get('_action')
  if (_action === ActionValue.STANDARD) {
    return await authenticator.authenticate(ActionValue.STANDARD, request, {
      successRedirect: '/'
    })
  }
  if (_action === ActionValue.GOOGLE) {
    return await authenticator.authenticate(ActionValue.GOOGLE, request, {
      successRedirect: '/'
    })
  }
  // eslint-disable-next-line unicorn/no-null
  return null
}

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
}

const Login = () => {
  const actionData = useActionData<typeof action>()
  useLoaderData()

  return (
    <AuthContainer buttonGroup={<GoogleButton />}>
      <h2 className='text-4xl text-center'>Login</h2>
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
      <SubmitButton value={ActionValue.STANDARD} name='_action' />
    </AuthContainer>
  )
}

export default Login
