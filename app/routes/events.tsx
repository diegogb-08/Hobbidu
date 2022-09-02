import { Outlet, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import AppContainer from '~/components/Layouts/AppContainer'
import { authenticator } from '~/services/auth.server'
import type { UserAuth } from '~/types/types'

export const loader: LoaderFunction = async ({ request }): Promise<UserAuth | null> => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/account/login'
  })
}

const CreateEvent = () => {
  const userAuth = useLoaderData<UserAuth | null>()

  return (
    <AppContainer>
      <div className='flex flex-col w-full h-full'>
        <h2 className='text-2xl text-center font-bold'>Welcome, {userAuth?.user?.name} 👋</h2>
        <Outlet />
      </div>
    </AppContainer>
  )
}

export default CreateEvent
