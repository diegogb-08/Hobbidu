import { Chip } from '@mui/material'
import { memo } from 'react'
import type { ZodEventWithHobbyAndUsers } from '~/types/types'
import { getDateAndTime } from '~/utils/time'

interface Props {
  event: ZodEventWithHobbyAndUsers
}

export const Template = memo(({ event }: Props) => {
  return (
    <div
      key={event.id}
      className='p-0 bg-clip-padding bg-cover bg-transparent relative flex z-0 break-words transition-shadow duration-300 w-full flex-row justify-start py-4 border-t border-gray md:pt-4 md:pb-5'
    >
      <div className='px-6 py-4 w-full'>
        <header className='flex flex-row justify-between'>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>{event.title}</h3>
          <span className='flex flex-col text-sm leading-5 tracking-tight text-darkGold font-medium pb-1 pt-1 line-clamp-1 lg:line-clamp-2er'>
            {getDateAndTime(new Date(event.event_date))}
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
})

Template.displayName = 'Template'
