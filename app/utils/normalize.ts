import type { Hobby, User, Event } from '@prisma/client'
import type { ZodEventWithHobbyAndUsers } from '~/types/types'
import { EventWithHobbyAndUsers } from '~/types/types'
import { getDate } from './time'

type EventWithHobbiesAndUsers = Event & {
  hobby: Hobby
  users: User[]
}

type EventRecord = Record<string, ZodEventWithHobbyAndUsers[]>
export const groupByDateTime = (event: EventWithHobbiesAndUsers[]) => {
  const eventRecord: EventRecord = {}
  event.reduce((_, currentEvent) => {
    const event = EventWithHobbyAndUsers.parse(currentEvent)
    const existingKeys = Object.keys(eventRecord)
    const eventDate = getDate(new Date(event.event_date))
    if (existingKeys.includes(eventDate)) {
      eventRecord[eventDate].push(event)
    } else {
      eventRecord[eventDate] = [event]
    }
    return eventRecord
  }, {})
  return eventRecord
}
