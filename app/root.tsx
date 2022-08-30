import type { ActionFunction, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import Header from './components/Header'
import { authenticator } from './services/auth.server'
import { getSession } from './services/session.server'
import styles from './tailwind.css'
import type { UserAuth } from './types/types'
import { db as database } from './utils/db.server'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles, as: 'style' }]

export const meta: MetaFunction = () => ({
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  charset: 'utf-8',
  title: 'Hobbidu',
  viewport: 'width=device-width,initial-scale=1'
})

export const loader: LoaderFunction = async ({ request }): Promise<UserAuth | null> => {
  return await authenticator.isAuthenticated(request)
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = (await session.get('sessionKey')) as UserAuth | undefined
  if (userAuth?.user.id) {
    const formData = await request.formData()
    const hobbyIds = formData.get('hobbyIds')?.toString().split(',')
    if (hobbyIds) {
      try {
        await database.user.update({
          data: {
            ...userAuth.user,
            hobbies: hobbyIds
          },
          where: {
            id: userAuth.user.id
          }
        })
        return json({ hobbyIds })
      } catch (error) {
        console.error({ error })
        return redirect('account/login')
      }
    } else {
      return redirect('hobbies')
    }
  }
  return redirect('account/login')
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='bg-secondary h-screen w-screen justify-center items-center'>
        <Header user={data?.user} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
