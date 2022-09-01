import type { User } from '@prisma/client'
import { useMatches } from '@remix-run/react'
import { Link } from 'react-router-dom'
import logo from '../../public/img/logo.png'
import LinkButton from './Buttons/LinkButton'
import NavBar from './NavBar'

const Header = ({ user }: { user?: User }) => {
  const matches = useMatches()
  return (
    <header className='box-border h-16 flex-1 flex justify-between items-center bg-white border-b-[0.5px] border-b-gray pl-4 pr-2'>
      <Link to='/' className='h-full flex items-center'>
        <img className='h-4/5' src={logo} alt='logo' />
      </Link>
      {user && user.hobbies.length > 0 ? (
        <NavBar />
      ) : !matches[1].pathname.includes('account') && !matches[2].pathname.includes('hobbies') ? (
        <div>
          <LinkButton to='account/register' text='Register' color='blue' className='hidden md:inline' />
          <LinkButton to='account/login' text='Login' color='primary' />
        </div>
      ) : undefined}
    </header>
  )
}

export default Header
