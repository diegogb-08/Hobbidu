import { authenticator } from '../services/auth.server'
import { SocialsProvider } from 'remix-auth-socials'
import type { LoaderFunction } from '@remix-run/node'

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: '/',
    failureRedirect: '/account/login'
  })
}

const GoogleCallback = () => {
  return <div></div>
}

export default GoogleCallback
