import type { FC, PropsWithChildren } from 'react'

const AppContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className='h-[calc(100%-64px)] flex-1 bg-secondary flex justify-center pt-6 lg:p-6'>
      <div className='w-full lg:w-[975px] h-full'>{children}</div>
    </div>
  )
}

export default AppContainer
