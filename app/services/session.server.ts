// app/services/session.server.ts
import type { DataFunctionArgs } from '@remix-run/node'
import { createCookieSessionStorage } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { UserAuthSchema } from '~/types/types'
import { SECRET } from './constants'

invariant(SECRET, 'Secret is not defined at the session.server')
// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_session', // use any name you want here
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [SECRET], // replace this with an actual secret
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
    maxAge: 60 * 60 * 24 * 7 // 7 days
  }
})

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage

export const getUserAuthFromSession = async (request: DataFunctionArgs['request']) => {
  const session = await getSession(request.headers.get('Cookie'))
  return UserAuthSchema.parse(await session.get('sessionKey'))
}
