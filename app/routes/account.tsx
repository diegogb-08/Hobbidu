import { Outlet, useMatches } from '@remix-run/react'
import { Link } from 'react-router-dom'

const Account = () => {
  const matches = useMatches()

  return (
    <div className='w-full h-[calc(100vh-4rem)] flex justify-center items-center lg:flex-row flex-col-reverse'>
      <div className='h-full flex-1 bg-login-background bg-center bg-no-repeat bg-cover' />
      <div className='h-full lg:w-5/12 w-full p-4 pb-8'>
        <div className='h-5/6 w-full bg-white p-10 rounded border-[0.5px] border-gray flex flex-col mb-4'>
          <Outlet />
        </div>
        <div className='h-1/6 w-full bg-white p-10 rounded border-[0.5px] border-gray flex justify-center items-center'>
          {matches[2]?.pathname?.includes('login') ? (
            <>
              <p>Don't have an account?</p>
              <Link className='ml-4 font-bold text-fontcolor2' to='register'>
                Register
              </Link>
            </>
          ) : (
            <>
              <p>Do you have an account?</p>
              <Link className='ml-4 font-bold text-fontcolor2' to='login'>
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account
