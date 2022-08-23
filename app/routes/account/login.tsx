import { Form, useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { Validation } from '~/types/types'
import { AuthStrategy } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'
import { validate } from '~/services/user.server'
import { SocialsProvider } from 'remix-auth-socials'

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate(AuthStrategy.STANDARD, request, {
    successRedirect: '/',
    failureRedirect: '/account/login',
    throwOnError: true
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
  return validate(request)
}

const Login = () => {
  const data = useLoaderData<Validation>()

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
          defaultValue={data?.errors.email}
          isError={!!data?.errors?.email}
          helperText={data?.errors?.email}
        />
        <div className='h-8' />
        <TextField
          text='Password'
          type='password'
          name='password'
          defaultValue={data?.errors.password}
          isError={!!data?.errors?.password}
          helperText={data?.errors?.password}
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
