import { db } from '~/utils/db.server'

export const getNextEventsByUserId = async (userId: string) => {
  const dateTime = new Date().toISOString()
  const [date] = dateTime.split('T')
  return db.event.findMany({
    orderBy: {
      event_date: 'asc'
    },
    where: {
      userIDs: { has: userId },
      NOT: {
        userIDs: {
          has: userId
        },
        AND: {
          event_date: { gte: new Date(date) }
        }
      }
    },
    include: {
      hobby: true,
      users: true
    }
  })
}

export const getNextEventsByHostId = async (userId: string) => {
  const dateTime = new Date().toISOString()
  const [date] = dateTime.split('T')
  return db.event.findMany({
    orderBy: {
      event_date: 'asc'
    },
    where: {
      hostID: userId,
      AND: {
        event_date: { gte: new Date(date) }
      }
    },
    include: {
      hobby: true,
      users: true
    }
  })
}
