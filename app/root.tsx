import type { DataFunctionArgs, LinksFunction, MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import Header from './components/Header'
import { authenticator } from './services/auth.server'
import stylesheet from './styles/tailwind.css'
import main from './styles/main.css'
import { UserAuthSchema } from './types/types'
import '@total-typescript/ts-reset'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet, as: 'style' },
  { rel: 'stylesheet', href: main, as: 'style' }
]

export const meta: MetaFunction = () => ({
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  charset: 'utf-8',
  title: 'Hobbidu',
  viewport: 'width=device-width,initial-scale=1'
})

export const loader = async ({ request }: DataFunctionArgs) => {
  return await authenticator.isAuthenticated(request)
}

export default function App() {
  const data = useLoaderData<typeof loader>()
  const auth = UserAuthSchema.parse(data)
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className='bg-secondary h-screen w-screen justify-center items-center'>
        <Header user={auth?.user} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
