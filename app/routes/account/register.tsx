import { Form, useActionData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { register, validate } from '~/services/user.server'
import AuthContainer from '~/components/Layouts/AuthContainer'
import GoogleButton from '~/components/Buttons/GoogleButton'
import { authenticator } from '~/services/auth.server'
import type { Validation } from '~/types/types'
import { AuthStrategy } from '~/types/types'
import { SocialsProvider } from 'remix-auth-socials'

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = new Request(request)
  const validateRquest = new Request(request)
  try {
    const response = await register(request)
    if (response) {
      return await authenticator.authenticate(AuthStrategy.STANDARD, clonedRequest, {
        successRedirect: '/',
        failureRedirect: '/account/login',
        throwOnError: true
      })
    }
    return response
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message
      return validate(validateRquest, message)
    }
    console.error({ error })
    // eslint-disable-next-line unicorn/no-null
    return null
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
}

const Register = () => {
  const actionData = useActionData<Validation>()

  return (
    <AuthContainer>
      <Form method='post' action='/account/register' className='flex w-full flex-col items-center justify-center'>
        <h2 className='text-4xl text-center'>Register</h2>
        <div className='h-8' />
        <TextField
          text='Full Name'
          placeholder='Diego Garcia Brisa'
          type='text'
          name='name'
          defaultValue={actionData?.values?.name as string}
          isError={!!actionData?.errors}
          helperText={actionData?.errors?.name}
        />
        <div className='h-8' />
        <TextField
          text='User Name'
          placeholder='Diego.08'
          type='text'
          name='user_name'
          defaultValue={actionData?.values?.user_name as string}
          isError={!!actionData?.errors}
          helperText={actionData?.errors?.user_name}
        />
        <div className='h-8' />
        <TextField
          text='Email'
          placeholder='email@email.com'
          type='email'
          name='email'
          defaultValue={actionData?.values?.email as string}
          isError={!!actionData?.errors}
          helperText={actionData?.errors?.email}
        />
        <div className='h-8' />
        <TextField
          text='Password'
          type='password'
          name='password'
          defaultValue={actionData?.values?.password as string}
          isError={!!actionData?.errors}
          helperText={actionData?.errors?.password}
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

export default Register
