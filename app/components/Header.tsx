import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData, useMatches } from '@remix-run/react'
import { Link } from 'react-router-dom'
import { getSession } from '~/services/session.server'
import logo from '../../public/img/logo.png'
import LinkButton from './Buttons/LinkButton'
import NavBar from './NavBar'

export const loader: LoaderFunction = async ({ request }) => {
  return await getSession(request.headers.get('_session'))
}

const Header = () => {
  const data = useLoaderData<typeof loader>()
  const matches = useMatches()
  return (
    <div className='box-border h-16 flex-1 flex justify-center items-center bg-white border-b-[0.5px] border-b-gray'>
      <Link to='/' className='h-full flex items-center'>
        <img className='h-4/5' src={logo} alt='logo' />
      </Link>
      <div className='absolute right-4'>
        {data ? (
          <NavBar />
        ) : (
          !matches[1].pathname.includes('account') && (
            <>
              <LinkButton to='account/register' text='Register' color='blue' />
              <LinkButton to='account/login' text='Login' color='primary' />
            </>
          )
        )}
      </div>
    </div>
  )
}

export default Header
