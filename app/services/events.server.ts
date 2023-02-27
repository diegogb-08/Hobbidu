import { db } from '~/utils/db.server'

export const getAllEventsByUserId = async (userId: string) => {
  return db.event.findMany({
    where: {
      userIDs: { has: userId }
    }
  })
}

export const getAllEventsByHostId = async (userId: string) => {
  return db.event.findMany({
    where: {
      hostID: userId
    }
  })
}
