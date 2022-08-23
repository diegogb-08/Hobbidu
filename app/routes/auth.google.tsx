import { authenticator } from '../services/auth.server'
import { SocialsProvider } from 'remix-auth-socials'
import type { ActionFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect: '/',
    failureRedirect: '/account/login'
  })
}

const Google = () => {
  return <div></div>
}

export default Google
