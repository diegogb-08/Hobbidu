import type { User } from '@prisma/client'
import type { Session } from '@remix-run/node'
import type { TypedResponse } from '@remix-run/server-runtime'
import { redirect } from '@remix-run/server-runtime'
import { randomUUID } from 'node:crypto'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } from './constants'
import { commitSession, getSession } from './session.server'
import { login } from './user.server'
import * as yup from 'yup'
import jwt_decode from 'jwt-decode'
import type { Jwt } from 'jsonwebtoken'

// Ensure they are defined and throw error if not
if (!GOOGLE_CLIENT_ID) throw new Error('Missing Google client id.')
if (!GOOGLE_CLIENT_SECRET) throw new Error('Missing Google client secret.')
if (!GOOGLE_CALLBACK_URL) throw new Error('Missing Google redirect uri.')

export type Policy<PolicyResult> = (
  request: Request,
  callback: (input: PolicyResult) => Promise<PolicyResult | TypedResponse<never>>
) => Promise<PolicyResult | TypedResponse<never>>

interface GoogleBody {
  id_token: string
  error: never
}

// This object is just so we can do `GOOGLE.clientId` or another attribute instead of using the all uppercase variables
const google = {
  domain: 'https://accounts.google.com/o/oauth2/auth',
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackUrl: GOOGLE_CALLBACK_URL
}

export const authorize: Policy<{
  user: User
  session: Session
  token: string
}> = async (request, callback) => {
  const session = await getSession(request.headers.get('Cookie'))

  try {
    // Here we are authenticating the user, this function receives the request and session and somehow get the user
    // data and token, how we get these depends on our application, we could query the DB or fetch another API

    const formData = await request.formData()
    const { user, token } = (await login(formData)) as {
      user: User
      token: string
    }
    // If we don't have a user or token we will throw an error
    if (!user || !token) throw new Error('Unauthorized')
    // if we have both user and token we will call the policy callback passing them along the session
    // eslint-disable-next-line n/no-callback-literal
    return await callback({ user, session, token })
  } catch {
    // if we got an error we will unset the token from the session
    session.unset('token')

    // we will generate a uuid and encode it to be used in URLs then store it in a key of the session
    // to generate this uuid we can use the uuid package from npm
    const state = encodeURIComponent(randomUUID())
    session.set('google:state', state)

    // finally we will commit the session and redirect the user to the redirectUrl generated using the state
    return redirect(redirectUrl(state), {
      headers: { 'Set-Cookie': await commitSession(session) }
    })
  }
}

function redirectUrl(state: string) {
  // first we create a new URL instance using our google.domain as initial value
  const url = new URL(google.domain)
  // then we set the pathname to `/authorize`
  url.pathname = '/authorize'
  // and now we start adding search params (aka the query string), we need a response_type as code
  url.searchParams.set('response_type', 'code')
  // we need the client_id
  url.searchParams.set('client_id', google.clientId)
  // the callback URL as redirect_uri
  url.searchParams.set('redirect_uri', google.callbackUrl)
  // the scope of the data we want, this is a list of words with a blank space between them
  url.searchParams.set('scope', 'openid profile email')
  // the last one is the state, this is our UUID, it can technically be any random string
  url.searchParams.set('state', state)
  // finally we return the URL as a string
  return url.toString()
}

export async function handleRedirect(request: Request) {
  // first we will get the session from the cookies
  const session = await getSession(request.headers.get('Cookie'))
  // then we will get the URL from the request
  const url = new URL(request.url)

  // we check if we have a state in the URL
  const state = url.searchParams.get('state')
  // if we don't redirect to login, since it's an invalid request
  if (!state) return redirect('/login')

  // if we have a state we need to check if the state is valid
  // the state is valid if it's the same we stored in the cookie in our `authorize` function
  // if it's valid we will unset it from the session
  if (session.get('google:state') === state) session.unset('google:state')
  // if it's not valid redirect to /login
  else return redirect('/login')

  // now we check if we have a code in the URL and redirect to /login if we don't
  const code = url.searchParams.get('code')
  if (!code) return redirect('/login')

  // if we have the code we will send a POST to our google domain with the pathname /oauth/token
  // this request will be used to exchange the code we got in the URL and get the `idToken` we will use later
  // here we need to send our google client secret, the callback URL, the client ID, the code we got and
  // a key grant_type with the value `authorization_code`
  const response = await fetch(new URL('/oauth/token', google.domain).toString(), {
    method: 'POST',
    headers: new Headers([['Content-Type', 'application/json']]),
    body: JSON.stringify({
      client_cecret: google.clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: google.callbackUrl,
      client_id: google.clientId,
      code
    })
  })

  // now we parse the response body as JSON, this body could be an object with `id_token` or `error`
  const body = (await response.json()) as { id_token: string; error: never } | { error: string }

  // check if our body is an error (has the `error` key) and redirect to login
  if (body.error) return redirect('/login')
  // get the `idToken` from the body
  const { id_token: idToken } = body as GoogleBody

  try {
    // now we want to try to decode the JWT from google and validate it, redirect to login if it's invalid
    // this decodeJwt function comes from the `jwt-decode` package in npm
    const decoded = jwt_decode<Jwt>(idToken)
    // and we need to validate the schema of the JWT token, we can use Yup for this, we will write the schema after this
    await jwtSchema.validate(decoded)
  } catch {
    // if it's not valid or we can't decode it we redirect to login
    return redirect('/login')
  }

  // now that we have the idToken we can use it to get a token to store in the session or find the user or anything we want
  // const token = await getUserSessionTokenSomehow(idToken)
  const token = ''
  // we set this token in the session
  session.set('token', token)
  // and finally redirect the user to the /private route and commit the session
  return redirect('/private', {
    headers: new Headers([['Set-Cookie', await commitSession(session)]])
  })
}

const jwtSchema = yup.object().shape({
  iss: yup
    .string()
    .oneOf(
      [google.domain, `${google.domain}/`],
      `The token iss value doesn't match the google_DOMAIN (${google.domain})`
    )
    .required("The token didn't come with an iss value."),
  aud: yup
    .string()
    .oneOf([google.clientId], `The token aud value doesn't match the google_CLIENT_ID (${google.clientId})`)
    .required("The token didn't come with an aud value."),
  exp: yup
    .number()
    .required()
    .test('is_before_date', 'Token exp value is before current time.', (value) => {
      if (!value) return false
      if (value < Math.ceil(Date.now() / 1000)) return false
      return true
    }),
  iat: yup
    .number()
    .required()
    .test('is_before_one_day', 'Token was issued before one day ago and is now invalid.', (value) => {
      if (!value) return false
      const date = new Date()
      date.setDate(date.getDate() - 1)
      if (value < Math.ceil(Number(date) / 1000)) return false
      return true
    })
})
