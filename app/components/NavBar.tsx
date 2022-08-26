import { IconButton } from '@mui/material'
import { Link, useMatches } from '@remix-run/react'
import AvatarIcon from '~/icons/AvatarIcon'
import CalendarPlusIcon from '~/icons/CalendarPlusIcon'
import HomeIcon from '~/icons/HomeIcon'
import { Routes } from '~/routes/routes'

const NavBar = () => {
  const match = useMatches()
  return (
    <nav className='flex w-80 justify-between'>
      <Link to={Routes.HOME}>
        <IconButton>
          <HomeIcon color={match[1].id.includes('index') ? '#f05356' : '#acacacc4'} />
        </IconButton>
      </Link>
      <Link to={Routes.CREATE_EVENT}>
        <IconButton>
          <CalendarPlusIcon color={match[1].id.includes(Routes.CREATE_EVENT) ? '#f05356' : '#acacacc4'} />
        </IconButton>
      </Link>
      <Link to={Routes.PROFILE}>
        <IconButton>
          <AvatarIcon color={match[1].id.includes(Routes.PROFILE) ? '#f05356' : '#acacacc4'} />
        </IconButton>
      </Link>
    </nav>
  )
}

export default NavBar
