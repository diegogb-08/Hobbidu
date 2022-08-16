import { Form } from '@remix-run/react'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'

const Login = () => {
  return (
    <Form method='post' className='flex flex-1 flex-col items-center justify-center'>
      <h2 className='text-4xl text-center'>Login</h2>
      <div className='h-8' />
      <TextField text='Email' placeholder='email@email.com' type='email' name='email' />
      <div className='h-8' />
      <TextField text='Password' type='password' name='password' />
      <div className='h-8' />
      <SubmitButton />
    </Form>
  )
}

export default Login
