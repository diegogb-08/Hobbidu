import type { User } from '@prisma/client'
import type { FC, PropsWithChildren } from 'react'
import Header from '../Header'

const AppContainer: FC<PropsWithChildren<{ user?: User }>> = ({ children, user }) => {
  return (
    <div className='bg-secondary h-screen w-screen justify-center items-center'>
      <Header user={user} />
      {children}
    </div>
  )
}

export default AppContainer
