import { useEffect, useRef, useState } from 'react'
import { Chip } from '@mui/material'
import { useLoaderData } from '@remix-run/react'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import LinkButton from '~/components/Buttons/LinkButton'
import AddIcon from '~/icons/AddIcon'
import { getAllHobbies } from '~/services/hobbies.server'
import type { HobbiesRecord, UserAuth } from '~/types/types'
import { UserAuthSchema } from '~/types/types'
import { getAllEventsByHostId, getAllEventsByUserId } from '~/services/events.server'
import type { Event } from '@prisma/client'
import { getSession } from '~/services/session.server'
import { authenticator } from '~/services/auth.server'

export type EventsLoader = {
  hobbies: HobbiesRecord
  events: Event[]
} & UserAuth

export const loader = async ({ request }: DataFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/account/login'
  })
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = UserAuthSchema.parse(await session.get('sessionKey'))

  if (userAuth) {
    const hobbies = await getAllHobbies()
    const participatingEvents = await getAllEventsByUserId(userAuth.user.id)
    const hostingEvents = await getAllEventsByHostId(userAuth.user.id)
    return {
      ...userAuth,
      hobbies,
      hostingEvents,
      participatingEvents
    }
  }
  return userAuth
}

const Index = () => {
  const data = useLoaderData<typeof loader>()
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
      <div className='flex w-full justify-center mt-4'>
        <div className='flex flex-col lg:inline-block border border-gray rounded p-6'>
          <span className='font-bold text-lg'>This are the hobbies you can create events</span>
          <div className='flex flex-wrap justify-center mt-4'>
            {data?.user?.hobbyIDs.map((hobbyId) => {
              const hobby = data.hobbies[hobbyId]
              return (
                <Chip
                  style={{ marginRight: '16px', marginBottom: '16px' }}
                  variant='filled'
                  key={hobby?.id}
                  label={hobby?.name?.toUpperCase()}
                  color='success'
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
      <div className='flex w-full'>
        {data?.hostingEvents.map((event) => {
          return <p key={event.id}>{JSON.stringify(event)}</p>
        })}
      </div>
    </>
  )
}

export default Index
