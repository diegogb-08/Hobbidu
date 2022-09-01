import type { LoaderFunction } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import AppContainer from '~/components/Layouts/AppContainer'
import { authenticator } from '~/services/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userAuth = await authenticator.isAuthenticated(request)

  if (userAuth?.user && (!userAuth?.user.hobbies || userAuth?.user.hobbies.length === 0)) {
    return redirect('profile/hobbies')
  }
  return null
}

export default function Index() {
  return <AppContainer>INDEX</AppContainer>
}
