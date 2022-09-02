import type { HobbiesRecord } from '~/types/types'
import { db } from '~/utils/db.server'

export const getAllHobbies = async (): Promise<HobbiesRecord> => {
  const hobbies = await db.hobby.findMany()

  const hobbiesRecord = hobbies.reduce((previousHobby, currentHobby) => {
    return {
      ...previousHobby,
      [currentHobby.id]: currentHobby
    }
  }, {})

  return hobbiesRecord
}
