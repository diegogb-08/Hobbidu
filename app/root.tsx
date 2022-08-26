import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import Header from './components/Header'
import { authenticator } from './services/auth.server'
import styles from './tailwind.css'
import type { UserAuth } from './types/types'

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
