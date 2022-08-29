import { Chip } from '@mui/material'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import { db } from '~/utils/db.server'

export const loader = async () => {
  const hobbies = await db.hobby.findMany()
  return json({ hobbies })
}

const Hobbies = () => {
  const { hobbies } = useLoaderData<typeof loader>()
  const [hobbyIds, setHobbyIds] = useState<string[]>([])

  const handleSelectHobby = (hobbyId: string) => {
    let newHobbyIds = [...hobbyIds]
    if (hobbyIds.includes(hobbyId)) {
      newHobbyIds = hobbyIds.filter((id) => id !== hobbyId)
    } else {
      newHobbyIds.push(hobbyId)
    }
    setHobbyIds(newHobbyIds)
  }

  return (
    <div className='flex flex-col flex-1 h-full p-6'>
      <h2 className='text-xl font-bold pb-6'>Please select the hobbies you want to follow!</h2>
      <div className='flex-wrap'>
        {hobbies.map((hobby) => {
          return (
            <Chip
              style={{ marginRight: '16px', marginBottom: '16px' }}
              variant={hobbyIds.includes(hobby.id) ? 'filled' : 'outlined'}
              clickable
              onClick={() => handleSelectHobby(hobby.id)}
              key={hobby.id}
              label={hobby.name.toUpperCase()}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Hobbies
