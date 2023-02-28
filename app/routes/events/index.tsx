import { useEffect, useRef, useState } from 'react'
import { Chip } from '@mui/material'
import { useLoaderData } from '@remix-run/react'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import LinkButton from '~/components/Buttons/LinkButton'
import AddIcon from '~/icons/AddIcon'
import { UserAuthSchema } from '~/types/types'
import { getNextEventsByHostId, getNextEventsByUserId } from '~/services/events.server'
import { getSession } from '~/services/session.server'
import { authenticator } from '~/services/auth.server'
import type { Hobby, User, Event } from '@prisma/client'
import { getDate, getDateAndTime, getDateTitle } from '~/utils/time'

type EventWithHobbiesAndUsers = Event & {
  hobby: Hobby
  users: User[]
}

type EventRecord = Record<string, EventWithHobbiesAndUsers[]>

export const loader = async ({ request }: DataFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/account/login'
  })
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = UserAuthSchema.parse(await session.get('sessionKey'))

  if (userAuth) {
    const participatingEvents = await getNextEventsByUserId(userAuth.user.id)
    const hostingEvents = await getNextEventsByHostId(userAuth.user.id)

    const groupByDateTime = (event: EventWithHobbiesAndUsers[]) => {
      const eventRecord: EventRecord = {}
      event.reduce((_, currentEvent) => {
        const existingKeys = Object.keys(eventRecord)
        const eventDate = getDate(currentEvent.event_date)
        if (existingKeys.includes(eventDate)) {
          eventRecord[eventDate].push(currentEvent)
        } else {
          eventRecord[eventDate] = [currentEvent]
        }
        return eventRecord
      }, {})
      return eventRecord
    }
    const hostingEventRecord = groupByDateTime(hostingEvents)
    const participatingEventsRecord = groupByDateTime(participatingEvents)

    return {
      ...userAuth,
      hostingEvents: hostingEventRecord,
      participatingEvents: participatingEventsRecord
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
            {data?.user?.hobbies?.map((hobby) => {
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
        {data?.hostingEvents && Object.keys(data?.hostingEvents).length > 0 ? (
          <>
            <h2 className='text-lg my-6'>Upcoming hosting events:</h2>
            <div className='p-0 bg-clip-padding bg-cover bg-transparent relative h-full flex bg-white z-0 break-words transition-shadow duration-300 w-full flex-col justify-start py-4 border-t border-gray3 md:pt-4 md:pb-5'>
              {Object.keys(data?.hostingEvents).map((eventDate) => {
                return (
                  <div key={eventDate} className='mb-16'>
                    <h2 className='text-xl md:text-xl font-bold pb-3 border-b-2 border-gray5 capitalize'>
                      {getDateTitle(eventDate)}
                    </h2>
                    {data?.hostingEvents[eventDate].map((event) => {
                      return (
                        <div
                          key={event.id}
                          className='p-0 bg-clip-padding bg-cover bg-transparent relative flex bg-white z-0 break-words transition-shadow duration-300 w-full flex-row justify-start py-4 border-t border-gray3 md:pt-4 md:pb-5'
                        >
                          <div className='px-6 py-4 w-full'>
                            <header className='flex flex-row justify-between'>
                              <h3 className='text-xl font-bold text-gray-800 mb-2'>{event.title}</h3>
                              <span className='flex flex-col text-sm leading-5 tracking-tight text-darkGold font-medium pb-1 pt-1 line-clamp-1 lg:line-clamp-2er'>
                                {getDateAndTime(event.event_date)}
                              </span>
                            </header>
                            <span className='block bg gray-200 px-3 py-2 rounded text-sm font-bold tracking-wide'>
                              {event.location.name}
                            </span>
                            <div className='flex items-center justify-between'>
                              <Chip
                                style={{ marginRight: '16px', marginBottom: '16px' }}
                                variant='filled'
                                label={event.hobby.name?.toUpperCase()}
                                color='success'
                              />
                              <div className='flex flex-row'>
                                <span className='bg-gray-200 px-3 py-2 rounded text-sm font-bold tracking-wide'>
                                  {event.userIDs.length} attendees
                                </span>
                                <span className='bg-gray-200 px-3 py-2 rounded text-sm font-bold tracking-wide'>
                                  {event.maxUsers - event.userIDs.length} spots left
                                </span>
                              </div>
                            </div>
                            <p className='text-gray-700 text-base mb-2'>{event.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </>
        ) : undefined}
      </div>
    </>
  )
}

export default Index
