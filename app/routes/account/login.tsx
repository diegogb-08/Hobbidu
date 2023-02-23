import { Form, useTransition } from '@remix-run/react'
import type { DataFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { AuthStrategy } from '~/types/types'
import GoogleButton from '~/components/Buttons/GoogleButton'
import AuthContainer from '~/components/Layouts/AuthContainer'
import { SocialsProvider } from 'remix-auth-socials'
import { useField, ValidatedForm, validationError } from 'remix-validated-form'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { isUserValidated } from '~/services/user.server'

const LoginSchema = z.object({
  email: zfd.text(z.string().min(1, { message: 'Email is required' }).email('Must be a valid email')),
  password: zfd.text(z.string().min(6, { message: 'Password must be a minimum of 6 characters' })),
  validatedUser: z.boolean().optional()
})

const clientValidator = withZod(LoginSchema)

export const action = async ({ request }: DataFunctionArgs) => {
  const clonedRequest = new Request(request)
  const serverValidator = withZod(
    LoginSchema.refine(
      async ({ email, password }) => {
        return await isUserValidated(email, password)
      },
      {
        message: 'Email or Password is incorrect.',
        path: ['validatedUser']
      }
    )
  )
  const result = await serverValidator.validate(await clonedRequest.formData())
  if (result.error) {
    return validationError(result.error)
  }
  await authenticator.authenticate(AuthStrategy.STANDARD, request, {
    successRedirect: '/',
    failureRedirect: '/account/login',
    throwOnError: true
  })
}

export const loader = async ({ request }: DataFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
}

const Login = () => {
  const { error } = useField('validatedUser', {
    formId: 'validatedUser',
    validationBehavior: {
      initial: 'onSubmit',
      whenSubmitted: 'onChange'
    }
  })
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'
  return (
    <AuthContainer>
      <ValidatedForm
        validator={clientValidator}
        method='post'
        action='/account/login'
        className='flex w-full flex-col items-center justify-center'
      >
        <h2 className='text-4xl text-center'>Login</h2>
        <TextField text='Email' placeholder='email@email.com' type='text' name='email' />
        <TextField text='Password' type='password' name='password' />
        {error && (
          <div className='h-16 w-full flex justify-center'>
            <span className='text-red text-center'>{error}</span>
          </div>
        )}
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
