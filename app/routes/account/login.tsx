import { Form, useActionData, useLoaderData, useTransition } from '@remix-run/react'
import type { DataFunctionArgs, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { Validation } from '~/types/types'
import { AuthStrategy } from '~/types/types'
// import { AuthStrategy } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'
import type { SessionErrorKey } from '~/services/user.server'
import { validate } from '~/services/user.server'
import { SocialsProvider } from 'remix-auth-socials'
import { getSession } from '~/services/session.server'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'

const validator = withZod(
  z.object({
    email: z.string().min(1, { message: 'Email is required' }).email('Must be a valid email'),
    password: z.string().min(6, { message: 'Password must be a minimum of 6 characters' })
  })
)

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData())
  console.log({ data })
  if (data.error) {
    console.log('error', validationError(data.error))
    return validationError(data.error)
  }
  await authenticator.authenticate(AuthStrategy.STANDARD, request, {
    successRedirect: '/',
    failureRedirect: '/account/login',
    throwOnError: true
  })
  return data.data
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
  useActionData()
  const data = useLoaderData<Validation>()
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'
  return (
    <AuthContainer>
      <ValidatedForm
        validator={validator}
        method='post'
        action='/account/login'
        className='flex w-full flex-col items-center justify-center'
      >
        <h2 className='text-4xl text-center'>Login</h2>
        <TextField text='Email' placeholder='email@email.com' type='text' name='email' />
        <TextField text='Password' type='password' name='password' />
        <div className='h-16 w-full flex justify-center'>
          <span className='text-red text-center'>{data?.errors?.message}</span>
        </div>
        <SubmitButton isSubmitting={isSubmitting} disabled={isSubmitting} />
      </ValidatedForm>
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
