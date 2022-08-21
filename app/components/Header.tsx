import type { User } from '@prisma/client'
import { useMatches } from '@remix-run/react'
import { Link } from 'react-router-dom'
import logo from '../../public/img/logo.png'
import LinkButton from './Buttons/LinkButton'
import NavBar from './NavBar'

const Header = ({ user }: { user?: User }) => {
  const matches = useMatches()
  return (
    <div className='box-border h-16 flex-1 flex justify-center items-center bg-white border-b-[0.5px] border-b-gray'>
      <Link to='/' className='h-full flex items-center'>
        <img className='h-4/5' src={logo} alt='logo' />
      </Link>
      <div className='absolute right-4'>
        {user ? (
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
