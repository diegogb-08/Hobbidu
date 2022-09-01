import { Outlet } from '@remix-run/react'
import AppContainer from '~/components/Layouts/AppContainer'

const Profile = () => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  )
}

export default Profile
