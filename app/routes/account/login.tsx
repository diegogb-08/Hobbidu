import { Form, useActionData, useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'

enum ActionValue {
  STANDARD = 'standard',
  GOOGLE = 'google'
}

export const action: ActionFunction = async ({ request }) => {
  const clonedRequest = new Request(request)
  const formData = await clonedRequest.formData()
  const _action = formData.get('_action')
  if (_action === ActionValue.STANDARD) {
    return await authenticator.authenticate(ActionValue.STANDARD, request, {
      successRedirect: '/'
    })
  }
  if (_action === ActionValue.GOOGLE) {
    return await authenticator.authenticate(ActionValue.GOOGLE, request, {
      successRedirect: '/'
    })
  }
  // eslint-disable-next-line unicorn/no-null
  return null
}

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/'
  })
}

const Login = () => {
  const actionData = useActionData<typeof action>()
  const loader = useLoaderData()

  console.log({ loader, actionData })
  return (
    <>
      <Form method='post' className='flex flex-1 flex-col items-center justify-center'>
        <h2 className='text-4xl text-center'>Login</h2>
        <div className='h-8' />
        <TextField text='Email' placeholder='email@email.com' type='email' name='email' />
        <div className='h-8' />
        <TextField text='Password' type='password' name='password' />
        <div className='h-8' />
        <SubmitButton value={ActionValue.STANDARD} name='_action' />
      </Form>
      <Form method='post' className='flex flex-1 flex-col items-center justify-center'>
        <button type='submit' name='_action' value={ActionValue.GOOGLE}>
          LOGIN WITH GOOGLE
        </button>
      </Form>
    </>
  )
}

export default Login
