import { db } from '~/utils/db.server'

export const getAllEventsByUserId = async (userId: string) => {
  return db.event.findMany({
    orderBy: {
      event_date: 'asc'
    },
    where: {
      userIDs: { has: userId },
      NOT: {
        userIDs: {
          has: userId
        }
      }
    },
    include: {
      hobby: true,
      users: true
    }
  })
}

export const getAllEventsByHostId = async (userId: string) => {
  return db.event.findMany({
    orderBy: {
      event_date: 'asc'
    },
    where: {
      hostID: userId
    },
    include: {
      hobby: true,
      users: true
    }
  })
}
