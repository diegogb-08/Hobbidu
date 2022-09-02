import { db } from '~/utils/db.server'

export const getAllEventsByUserId = async (userId: string) => {
  return db.event.findMany({
    where: {
      user_id: userId
    }
  })
}
