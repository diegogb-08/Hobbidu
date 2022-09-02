import { useEffect, useRef, useState } from 'react'
import { Chip } from '@mui/material'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import LinkButton from '~/components/Buttons/LinkButton'
import AddIcon from '~/icons/AddIcon'
import { getAllHobbies } from '~/services/hobbies.server'
import type { HobbiesRecord, UserAuth } from '~/types/types'
import { getAllEventsByUserId } from '~/services/events.server'
import type { Event } from '@prisma/client'
import { getSession } from '~/services/session.server'

interface EventsLoader extends UserAuth {
  hobbies: HobbiesRecord
  events: Event[]
}

export const loader: LoaderFunction = async ({ request }): Promise<EventsLoader | undefined> => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = (await session.get('sessionKey')) as UserAuth | undefined

  if (userAuth) {
    const hobbies = await getAllHobbies()
    const events = await getAllEventsByUserId(userAuth.user.id)
    return {
      ...userAuth,
      hobbies,
      events
    }
  }
  return userAuth
}

const Index = () => {
  const eventData = useLoaderData<EventsLoader | undefined>()
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseOver = () => setIsHovered(true)
  const handleMouseOut = () => setIsHovered(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [])

  return (
    <>
      <div className='flex justify-center mt-4'>
        <div className='inline-block border border-gray rounded p-6'>
          <span className='font-bold text-lg'>This are the hobbies you can create events</span>
          <div className='flex flex-wrap justify-center mt-4'>
            {eventData?.user?.hobbies.map((hobbyId) => {
              const hobby = eventData.hobbies[hobbyId]
              return (
                <Chip
                  style={{ marginRight: '16px', marginBottom: '16px' }}
                  variant='filled'
                  key={hobby?.id}
                  label={hobby?.name?.toUpperCase()}
                />
              )
            })}
          </div>
          <div className='flex justify-center'>
            <LinkButton to='schedule' color='primary' ref={ref}>
              <div className='flex flex-row flex-1'>
                <AddIcon color={isHovered ? '#ffffff' : undefined} style={{ marginRight: '8px' }} />
                <span>Create Event</span>
              </div>
            </LinkButton>
          </div>
        </div>
      </div>
      <div className='fles fles-1'></div>
    </>
  )
}

export default Index
