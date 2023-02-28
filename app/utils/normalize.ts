import type { Hobby, User, Event } from '@prisma/client'
import { getDate } from './time'

type EventWithHobbiesAndUsers = Event & {
  hobby: Hobby
  users: User[]
}

type EventRecord = Record<string, EventWithHobbiesAndUsers[]>
export const groupByDateTime = (event: EventWithHobbiesAndUsers[]) => {
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
