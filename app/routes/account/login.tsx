import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { FormValues, Validation } from '~/types/types'
import { AuthStrategy } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'
import type { SessionErrorKey } from '~/services/user.server'
import { validate } from '~/services/user.server'
import { SocialsProvider } from 'remix-auth-socials'
import { getSession } from '~/services/session.server'

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = new Request(request)
  const formData = await clonedRequest.formData()
  const values = Object.fromEntries(formData)

  await authenticator.authenticate(AuthStrategy.STANDARD, request, {
    successRedirect: '/',
    failureRedirect: '/account/login',
    throwOnError: true
  })
  return values
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  const sessionErrorKey: { message: SessionErrorKey } | undefined = session.get('sessionErrorKey')

  await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
  return validate(sessionErrorKey?.message)
}

const Login = () => {
  const data = useLoaderData<Validation>()
  const action = useActionData<FormValues>()
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting' || transition.state === 'loading'
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
          defaultValue={action?.email as string}
          isError={!!data?.errors?.email}
          helperText={data?.errors?.email}
        />
        <div className='h-8' />
        <TextField
          text='Password'
          type='password'
          name='password'
          defaultValue={action?.password as string}
          isError={!!data?.errors?.password}
          helperText={data?.errors?.password}
        />
        <div className='h-8' />
        <SubmitButton isSubmitting={isSubmitting} disabled={isSubmitting} />
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
