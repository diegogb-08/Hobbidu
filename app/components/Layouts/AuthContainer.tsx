import { Form } from '@remix-run/react'
import type { FC, PropsWithChildren, ReactNode } from 'react'

interface AuthContainerProps {
  buttonGroup?: ReactNode | ReactNode[]
}

const AuthContainer: FC<PropsWithChildren<AuthContainerProps>> = ({ children, buttonGroup }) => {
  return (
    <div className='flex w-full h-full flex-col items-center justify-between bg-whit'>
      <Form method='post' className='flex w-full flex-col items-center justify-center'>
        {children}
      </Form>
      {buttonGroup && (
        <>
          <div className='border-[0.5px] h-[1px] border-gray border-solid w-full justify-center flex'>
            <span className='relative bottom-[14px] text-gray bg-white text-center w-8 h-8'>or</span>
          </div>
          <Form method='post' className='flex w-full flex-col items-center justify-center'>
            {buttonGroup}
          </Form>
        </>
      )}
    </div>
  )
}

export default AuthContainer
