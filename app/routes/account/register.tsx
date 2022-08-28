import { Form, useActionData, useTransition } from '@remix-run/react'
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
  const formData = await clonedRequest.formData()
  try {
    const response = await register(formData)
    if (response) {
      return await authenticator.authenticate(AuthStrategy.STANDARD, request, {
        successRedirect: '/hobbies',
        failureRedirect: '/account/login',
        throwOnError: true
      })
    }
    return response
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message
      return validate(message, formData)
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
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'
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
          isError={!!actionData?.errors?.name}
          helperText={actionData?.errors.emptyFields ? actionData?.errors?.name : 'First Name and Last Name'}
          pattern='(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})'
          title='Please add First Name and Last Name'
        />
        <TextField
          text='User Name'
          placeholder='User.01'
          type='text'
          name='user_name'
          defaultValue={actionData?.values?.user_name as string}
          isError={!!actionData?.errors?.user_name}
          helperText={
            actionData?.errors.emptyFields
              ? actionData?.errors?.user_name
              : actionData?.errors?.message
              ? undefined
              : 'User Name should be between 5-16 characters'
          }
          pattern='^([a-zA-Z0-9_.-]{5,17})'
          title='User Name should be between 5-16 characters. Escpecial characters allowed: ._-'
        />
        <TextField
          text='Email'
          placeholder='email@email.com'
          type='email'
          name='email'
          defaultValue={actionData?.values?.email as string}
          isError={!!actionData?.errors?.email}
          helperText={actionData?.errors.emptyFields ? actionData?.errors?.email : undefined}
          pattern='^([a-z0-9_.-]{3,17})+[@]+([a-zA-Z0-9_.-]{3,17})+[.]+[a-z]{2,6}'
        />
        <TextField
          text='Password'
          type='password'
          name='password'
          defaultValue={actionData?.values?.password as string}
          isError={!!actionData?.errors?.password}
          helperText={
            actionData?.errors?.emptyFields
              ? actionData?.errors?.password
              : 'Password should be between 5-16 characters.'
          }
          pattern='^([a-zA-Z0-9_.-]{5,17})'
          title='Password should be between 5-16 characters. Escpecial characters allowed: ._-'
        />
        <div className='h-16 w-full flex justify-center'>
          <span className='text-red text-center'>{actionData?.errors?.message}</span>
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

export default Register
