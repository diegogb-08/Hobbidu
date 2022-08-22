import { useActionData, useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { ActionAuth } from '~/types/types'
import { ActionValue } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'
import { validateLogin } from '~/services/user.server'

export const action: ActionFunction = async ({ request }): Promise<ActionAuth | null> => {
  const clonedRequest = new Request(request)
  const formData = await clonedRequest.formData()
  const _action = formData.get('_action')

  if (_action === ActionValue.STANDARD) {
    return await authenticator.authenticate(ActionValue.STANDARD, request, {
      successRedirect: '/',
      failureRedirect: '/account/login',
      throwOnError: true
    })
  }
  if (_action === ActionValue.GOOGLE) {
    return await authenticator.authenticate(ActionValue.GOOGLE, request, {
      successRedirect: '/',
      failureRedirect: '/account/login',
      throwOnError: true
    })
  }
  // eslint-disable-next-line unicorn/no-null
  return null
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
  return validateLogin(request)
}

const Login = () => {
  const actionData = useActionData<typeof action>()
  const loaderData = useLoaderData()

  console.log({ actionData, loaderData })
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
        isError={!!loaderData?.errors?.email}
        helperText={loaderData?.errors?.email}
      />
      <div className='h-8' />
      <TextField
        text='Password'
        type='password'
        name='password'
        defaultValue={actionData?.password}
        isError={!!loaderData?.errors?.password}
        helperText={loaderData?.errors?.password}
      />
      <div className='h-8' />
      <SubmitButton value={ActionValue.STANDARD} name='_action' />
    </AuthContainer>
  )
}

export default Login
