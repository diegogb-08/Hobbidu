import { Form, useActionData, useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { ActionAuth } from '~/types/types'
import { ActionValue } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'
import { validateLogin } from '~/services/user.server'
import { SocialsProvider } from 'remix-auth-socials'

export const action: ActionFunction = async ({ request }): Promise<ActionAuth | null> => {
  return await authenticator.authenticate(ActionValue.STANDARD, request, {
    successRedirect: '/',
    failureRedirect: '/account/login',
    throwOnError: true
  })
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

  return (
    <AuthContainer>
      <Form method='post' action='/account/login' className='flex w-full flex-col items-center justify-center'>
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
        <SubmitButton />
      </Form>
      <div className='border-[0.5px] h-[1px] border-gray border-solid w-full justify-center flex'>
        <span className='relative bottom-[14px] text-gray bg-white text-center w-8 h-8'>or</span>
      </div>
      <Form
        method='post'
        action={`/auth/${SocialsProvider.GOOGLE}`}
        className='flex w-full flex-col items-center justify-center'
      >
        <GoogleButton />
      </Form>
    </AuthContainer>
  )
}

export default Login
