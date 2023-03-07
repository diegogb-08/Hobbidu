import { Outlet } from '@remix-run/react'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import AppContainer from '~/components/Layouts/AppContainer'
import { authenticator } from '~/services/auth.server'
import { UserNameSchema } from './profile/$userName'
import { Routes } from './routes'

export const loader = async ({ request, params }: DataFunctionArgs) => {
  const userAuth = await authenticator.isAuthenticated(request, {
    failureRedirect: '/'
  })
  const response = UserNameSchema.safeParse(params.userName)
  if (!response.success) {
    return redirect(`${Routes.PROFILE}/${userAuth?.user.user_name}`)
  }
  return userAuth
}

const Profile = () => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  )
}

export default Profile
