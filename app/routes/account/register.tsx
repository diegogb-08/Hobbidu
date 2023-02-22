import { Form, useActionData, useTransition } from '@remix-run/react'
import type { DataFunctionArgs, LoaderFunction } from '@remix-run/node'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { CreateUserSchema, register } from '~/services/user.server'
import AuthContainer from '~/components/Layouts/AuthContainer'
import GoogleButton from '~/components/Buttons/GoogleButton'
import { authenticator } from '~/services/auth.server'
import { AuthStrategy } from '~/types/types'
import { SocialsProvider } from 'remix-auth-socials'
import { getFormData } from 'remix-params-helper'
import { ValidatedForm } from 'remix-validated-form'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'

const validator = withZod(
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    user_name: z.string().min(5).max(16)
  })
)

export const action = async ({ request }: DataFunctionArgs) => {
  const clonedRequest = new Request(request)
  const result = await getFormData(request, CreateUserSchema)
  const formData = await clonedRequest.formData()
  const values = Object.fromEntries(formData)
  if (!result.success) {
    return { values, errors: result.errors }
  }

  try {
    const response = await register(result.data)
    if (response) {
      await authenticator.authenticate(AuthStrategy.STANDARD, request, {
        successRedirect: 'profile/hobbies',
        failureRedirect: '/account/login',
        throwOnError: true
      })
      return { values, errors: {} }
    }
    return { values, errors: {} }
  } catch (error) {
    console.error({ error })
    return { values, errors: {} }
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
}

const Register = () => {
  const actionData = useActionData<typeof action>()
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'
  return (
    <AuthContainer>
      <ValidatedForm
        validator={validator}
        method='post'
        action='/account/register'
        className='flex w-full flex-col items-center justify-center'
      >
        <h2 className='text-4xl text-center'>Register</h2>
        <div className='h-8' />
        <TextField text='Full Name' placeholder='Diego Garcia Brisa' type='text' name='name' />
        <TextField text='User Name' placeholder='User.01' type='text' name='user_name' />
        <TextField text='Email' placeholder='email@email.com' type='email' name='email' />
        <TextField text='Password' type='password' name='password' />
        <div className='h-16 w-full flex justify-center'>
          <span className='text-red text-center'>{actionData?.errors?.message}</span>
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

export default Register
