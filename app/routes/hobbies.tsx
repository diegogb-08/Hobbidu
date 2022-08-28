import type { Hobby } from '@prisma/client'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import Chip from '~/components/Buttons/Chip'
import { db } from '~/utils/db.server'

export const loader = async () => {
  const hobbies = await db.hobby.findMany()
  return json({ hobbies })
}

const Hobbies = () => {
  const { hobbies } = useLoaderData<typeof loader>()
  const [selectedHobbies, setSelectedHobbies] = useState<Hobby[]>([])

  const handleHobby = (hobby: Hobby) => {
    const newSelectedHobbies = [...selectedHobbies]
    newSelectedHobbies.push(hobby)
    setSelectedHobbies(newSelectedHobbies)
  }

  return (
    <div className='flex flex-col flex-1 h-full justify-center'>
      <div className='grid grid-cols-7 gap-2 grid-flow-row'>
        {hobbies.map((hobby) => (
          <Chip obj={hobby as unknown as Hobby} onClick={handleHobby} key={hobby.id} text={hobby.name} />
        ))}
      </div>
    </div>
  )
}

export default Hobbies
