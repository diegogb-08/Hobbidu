import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react'
import type { DataFunctionArgs, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { Validation } from '~/types/types'
import { AuthStrategy } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'
import type { SessionErrorKey } from '~/services/user.server'
import { LoginSchema, validate } from '~/services/user.server'
import { SocialsProvider } from 'remix-auth-socials'
import { getSession } from '~/services/session.server'
import { getFormData } from 'remix-params-helper'

export const action = async ({ request }: DataFunctionArgs) => {
  const clonedRequest = new Request(request)
  const result = await getFormData(request, LoginSchema)
  const formData = await clonedRequest.formData()
  const values = Object.fromEntries(formData)
  if (!result.success) {
    return { values, errors: result.errors }
  }

  await authenticator.authenticate(AuthStrategy.STANDARD, request, {
    successRedirect: '/',
    failureRedirect: '/account/login',
    throwOnError: true
  })
  return { values, errors: {} }
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
  const actionData = useActionData<typeof action>()
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'
  console.log({ data, action: actionData })
  return (
    <AuthContainer>
      <Form method='post' action='/account/login' className='flex w-full flex-col items-center justify-center'>
        <h2 className='text-4xl text-center'>Login</h2>
        <TextField
          text='Email'
          placeholder='email@email.com'
          type='email'
          name='email'
          defaultValue={actionData?.values?.email}
          isError={!!actionData?.errors?.email}
          helperText={data?.errors.emptyFields ? data?.errors?.email : undefined}
        />
        <TextField
          text='Password'
          type='password'
          name='password'
          defaultValue={actionData?.values?.password}
          isError={!!actionData?.errors?.password}
          helperText={data?.errors.emptyFields ? data?.errors?.password : undefined}
        />
        <div className='h-16 w-full flex justify-center'>
          <span className='text-red text-center'>{data?.errors?.message}</span>
        </div>
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
