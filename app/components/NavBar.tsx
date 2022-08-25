import { Link } from '@remix-run/react'
import AvatarIcon from '~/icons/AvatarIcon'
import CalendarPlusIcon from '~/icons/CalendarPlusIcon'
import HomeIcon from '~/icons/HomeIcon'

const NavBar = () => {
  return (
    <div className='flex w-80 justify-between'>
      <Link to='/'>
        <HomeIcon color='#acacacc4' />
      </Link>
      <Link to='/create-event'>
        <CalendarPlusIcon color='#acacacc4' />
      </Link>
      <Link to='/profile'>
        <AvatarIcon color='#acacacc4' />
      </Link>
    </div>
  )
}

export default NavBar
