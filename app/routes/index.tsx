import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import AppContainer from '~/components/Layouts/AppContainer'
import type { ErrorAuth, UserAuth } from '~/services/auth.server'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }): Promise<UserAuth | ErrorAuth | null> => {
  return await authenticator.isAuthenticated(request)
}

export default function Index() {
  const data = useLoaderData<typeof loader>()
  return (
    <AppContainer user={data?.user}>
      <div className='h-full w-full bg-secondary'>hello Index</div>
    </AppContainer>
  )
}
