import { Chip } from '@mui/material'
import type { Hobby } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { useState } from 'react'
import TextField from '~/components/Form/TextField'
import AppContainer from '~/components/Layouts/AppContainer'
import { authenticator } from '~/services/auth.server'
import { db } from '~/utils/db.server'

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: 'account/login'
  })

  const hobbies = await db.hobby.findMany()
  return json({ hobbies })
}

const Hobbies = () => {
  const { hobbies } = useLoaderData<{ hobbies: Hobby[] }>()
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
    <AppContainer>
      <h2 className='text-xl font-bold pb-6'>Please select the hobbies you want to follow!</h2>
      <div className='flex flex-wrap justify-center'>
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
      <Form className='flex w-full justify-center'>
        <TextField name='hobby' type='text' />
        <button type='submit' className='ml-4 h-9 w-40 p-4 text-center flex justify-center items-center'>
          Add Hobby
        </button>
      </Form>
    </AppContainer>
  )
}

export default Hobbies
