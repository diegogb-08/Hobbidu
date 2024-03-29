import { useMatches } from '@remix-run/react'
import { Link } from 'react-router-dom'
import type { ZodUserWithHobbies } from '~/types/types'

import logo from '../../public/img/logo.png'
import LinkButton from './Buttons/LinkButton'
import NavBar from './NavBar'

const Header = ({ user }: { user?: ZodUserWithHobbies }) => {
  const matches = useMatches()
  return (
    <header className='box-border h-16 flex-1 flex justify-between items-center bg-white border-b-[0.5px] border-b-gray pl-4 pr-2'>
      <Link to='/' className='h-full flex items-center'>
        <img className='h-4/5' src={logo} alt='logo' />
      </Link>
      {user && user?.hobbyIDs?.length > 0 ? (
        <NavBar user={user} />
      ) : !matches[1]?.pathname?.includes('account') && !matches[2]?.pathname?.includes('hobbies') ? (
        <div>
          <LinkButton to='/account/register' text='Register' color='blue' className='hidden lg:inline' />
          <LinkButton to='/account/login' text='Login' color='primary' />
        </div>
      ) : undefined}
    </header>
  )
}

export default Header
