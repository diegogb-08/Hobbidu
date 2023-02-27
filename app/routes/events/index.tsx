import { useEffect, useRef, useState } from 'react'
import { Chip } from '@mui/material'
import { useLoaderData } from '@remix-run/react'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import LinkButton from '~/components/Buttons/LinkButton'
import AddIcon from '~/icons/AddIcon'
import { getAllHobbies } from '~/services/hobbies.server'
import { UserAuthSchema } from '~/types/types'
import { getAllEventsByHostId, getAllEventsByUserId } from '~/services/events.server'
import { getSession } from '~/services/session.server'
import { authenticator } from '~/services/auth.server'

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
          <h1 className='font-bold text-lg'>This are the hobbies you can create events</h1>
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
      <div className='flex w-full flex-col'>
        <h2 className='text-lg my-6'>Upcoming hosting events:</h2>
        {data?.hostingEvents.map((event) => {
          return (
            <div key={event.id} className='bg-white shadow-lg rounded-lg overflow-hidden mb-4'>
              <div className='px-6 py-4'>
                <h3 className='text-xl font-bold text-gray-800 mb-2'>{event.title}</h3>
                <p className='text-gray-700 text-base mb-2'>{event.description}</p>
                <div className='flex items-center justify-between'>
                  <span className='block bg gray 200 px 3 py 2 rounded text sm font bold tracking wide uppercase'>
                    {event.event_date}
                  </span>
                  <span className='block bg gray 200 px 3 py 2 rounded text sm font bold tracking wide uppercase'>
                    {event.maxUsers}
                  </span>
                  <span className='block bg gray 200 px 3 py 2 rounded text sm font bold tracking wide uppercase'>
                    {event.location.name}
                  </span>
                  <span className='block bg gray 200 px 3 py 2 rounded text sm font bold tracking wide uppercase'>
                    {event.hobbyID}
                  </span>
                  <span className='block bg gray 200 px 3 py 2 rounded text sm font bold tracking wide uppercase'>
                    {event.userIDs}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Index
