import type { DataFunctionArgs } from '@remix-run/server-runtime'
import { z } from 'zod'
import { getNextEventsByHostId, getNextEventsByUserId } from '~/services/events.server'
import { getDateTitle } from '~/utils/time'
import { useLoaderData } from '@remix-run/react'
import { groupByDateTime } from '~/utils/normalize'
import { Template } from '~/components/Template'

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
          <div className='p-0 bg-clip-padding bg-cover bg-transparent relative h-full flex z-0 break-words transition-shadow duration-300 w-full flex-col justify-start py-4 border-t border-gray md:pt-4 md:pb-5'>
            {Object.keys(hostingEvents).map((eventDate) => {
              return (
                <div key={eventDate} className='mb-16'>
                  <h2 className='text-xl md:text-xl font-bold pb-3 border-b-1 border-gray capitalize'>
                    {getDateTitle(eventDate)}
                  </h2>
                  {hostingEvents[eventDate].map((event) => {
                    return <Template key={event.id} event={event} />
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
