import type { DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { getNextEventsByHostId, getNextEventsByUserId } from '~/services/events.server'
import { getDateAndTime, getDateTitle } from '~/utils/time'
import { useLoaderData } from '@remix-run/react'
import { Chip } from '@mui/material'
import { groupByDateTime } from '~/utils/normalize'

const UserIDSchema = z.string()

export const loader = async ({ params }: DataFunctionArgs) => {
  const userId = UserIDSchema.parse(params.userId)
  const participatingEvents = await getNextEventsByUserId(userId)
  const hostingEvents = await getNextEventsByHostId(userId)

  const hostingEventRecord = groupByDateTime(hostingEvents)
  const participatingEventsRecord = groupByDateTime(participatingEvents)

  return {
    hostingEvents: hostingEventRecord,
    participatingEvents: participatingEventsRecord
  }
}

const EventsByUserID = () => {
  const { hostingEvents } = useLoaderData<typeof loader>()

  return (
    <div className='flex w-full flex-col'>
      {hostingEvents && Object.keys(hostingEvents).length > 0 ? (
        <>
          <h2 className='text-lg my-6'>Upcoming hosting events:</h2>
          <div className='p-0 bg-clip-padding bg-cover bg-transparent relative h-full flex bg-white z-0 break-words transition-shadow duration-300 w-full flex-col justify-start py-4 border-t border-gray3 md:pt-4 md:pb-5'>
            {Object.keys(hostingEvents).map((eventDate) => {
              return (
                <div key={eventDate} className='mb-16'>
                  <h2 className='text-xl md:text-xl font-bold pb-3 border-b-2 border-gray5 capitalize'>
                    {getDateTitle(eventDate)}
                  </h2>
                  {hostingEvents[eventDate].map((event) => {
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
  )
}

export default EventsByUserID
