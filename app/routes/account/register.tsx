import { Form, useTransition } from '@remix-run/react'
import type { DataFunctionArgs, LoaderFunction } from '@remix-run/node'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { isUserRegistered } from '~/services/user.server'
import AuthContainer from '~/components/Layouts/AuthContainer'
import GoogleButton from '~/components/Buttons/GoogleButton'
import { authenticator } from '~/services/auth.server'
import { AuthStrategy } from '~/types/types'
import { SocialsProvider } from 'remix-auth-socials'
import { useField, ValidatedForm, validationError } from 'remix-validated-form'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

const RegisterSchema = z
  .object({
    email: zfd.text(z.string().min(1, { message: 'Email is required' }).email('Must be a valid email')),
    user_name: zfd.text(z.string().min(4)),
    password: zfd.text(z.string().min(6, { message: 'Password must be a minimum of 6 characters' })),
    passwordConfirm: zfd.text(z.string()),
    isUserRegistered: z.boolean().optional()
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords must match'
  })

const clientValidator = withZod(RegisterSchema)
export type NewUser = Omit<z.infer<typeof RegisterSchema>, 'passwordConfirm'>

export const action = async ({ request }: DataFunctionArgs) => {
  const clonedRequest = new Request(request)
  const serverValidator = withZod(
    RegisterSchema.refine(
      async ({ email, password, user_name }) => {
        return await isUserRegistered({ email, password, user_name })
      },
      {
        message: 'Email or User Name already exists',
        path: ['isUserRegistered']
      }
    )
  )
  const result = await serverValidator.validate(await clonedRequest.formData())
  console.log({ result })
  if (result.error) {
    return validationError(result.error)
  }

  const response = await authenticator.authenticate(AuthStrategy.STANDARD, request, {
    successRedirect: '/',
    failureRedirect: '/account/login',
    throwOnError: true
  })
  console.log('REGISTER RESPONSE: ====>', { response })
}

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
}

const Register = () => {
  const { error } = useField('isUserRegistered', {
    formId: 'isUserRegistered',
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
        action='/account/register'
        className='flex w-full flex-col items-center justify-center'
      >
        <h2 className='text-4xl text-center'>Register</h2>
        <div className='h-8' />
        <TextField text='User Name' placeholder='User.01' type='text' name='user_name' />
        <TextField text='Email' placeholder='email@email.com' type='text' name='email' />
        <TextField text='Password' type='password' name='password' />
        <TextField text='Confirm Password' type='password' name='passwordConfirm' />
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

export default Register
