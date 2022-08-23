import type { FC, PropsWithChildren } from 'react'

const AuthContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className='flex w-full h-full flex-col items-center justify-between bg-whit'>{children}</div>
}

export default AuthContainer
