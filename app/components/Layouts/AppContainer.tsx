import type { FC, PropsWithChildren } from 'react'

const AppContainer: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className='h-full flex-1 bg-secondary flex justify-center'>
      <div className='w-[975px] h-full'>{children}</div>
    </div>
  )
}

export default AppContainer
