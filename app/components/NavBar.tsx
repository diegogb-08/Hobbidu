import { IconButton } from '@mui/material'
import { Link, useMatches } from '@remix-run/react'
import AvatarIcon from '~/icons/AvatarIcon'
import CalendarPlusIcon from '~/icons/CalendarPlusIcon'
import HomeIcon from '~/icons/HomeIcon'
import { Routes } from '~/routes/routes'
import type { ZodUserWithHobbies } from '~/types/types'

interface Props {
  user?: ZodUserWithHobbies
}

const NavBar = ({ user }: Props) => {
  const match = useMatches()
  return (
    <nav className='flex w-80 justify-between'>
      <Link to={Routes.HOME}>
        <IconButton>
          <HomeIcon color={match[1].id.includes('index') ? '#f05356' : '#acacacc4'} />
        </IconButton>
      </Link>
      <Link to={`${Routes.EVENTS}/${user?.id}`} prefetch='intent'>
        <IconButton>
          <CalendarPlusIcon color={match[1].id.includes(Routes.EVENTS) ? '#f05356' : '#acacacc4'} />
        </IconButton>
      </Link>
      <Link to={`${Routes.PROFILE}/${user?.user_name}`}>
        <IconButton>
          <AvatarIcon color={match[1].id.includes(Routes.PROFILE) ? '#f05356' : '#acacacc4'} />
        </IconButton>
      </Link>
    </nav>
  )
}

export default NavBar
