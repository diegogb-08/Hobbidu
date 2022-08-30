import { Chip } from '@mui/material'
import type { Hobby } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '~/components/Form/TextField'
import AppContainer from '~/components/Layouts/AppContainer'
import { authenticator } from '~/services/auth.server'
import { getSession } from '~/services/session.server'
import type { UserAuth } from '~/types/types'
import { db } from '~/utils/db.server'

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = (await session.get('sessionKey')) as UserAuth | undefined

  const formData = await request.formData()
  const hobby = formData.get('hobby')
  if (userAuth?.user?.id) {
    if (hobby) {
      try {
        const newHobby = await db.hobby.create({
          data: {
            name: (hobby as string)?.toUpperCase(),
            user_id: userAuth?.user?.id
          }
        })
        return { success: true, hobbyId: newHobby.id }
      } catch (error) {
        console.error(error)
        return { hobby, errors: 'Something went wrong' }
      }
    }
    return { hobby, errors: 'Field cannot be empty' }
  }
  return { message: 'Action not authorized.' }
}

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: 'account/login'
  })

  const hobbies = await db.hobby.findMany()
  return json({ hobbies })
}

const Hobbies = () => {
  const actionData = useActionData()
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

  useEffect(() => {
    if (actionData?.sucess) {
      const newHobbyIds = [...hobbyIds]
      newHobbyIds.push(actionData?.hobbyId)
      setHobbyIds(newHobbyIds)
    }
  }, [actionData])

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
      <Form method='post' className='flex w-full justify-center'>
        <TextField
          name='hobby'
          type='text'
          maxLength={25}
          pattern='(^[A-Za-z\s]{3,25})'
          isError={!!actionData?.errors}
          defaultValue={actionData?.hobby}
          helperText={actionData?.errors}
        />
        <button
          type='submit'
          className='ml-4 h-[38px] w-40 p-4 text-center flex justify-center items-center bg-transparent font-semibold hover:text-fontcolor-white py-2 px-4 border hover:border-transparent rounded hover:bg-primary text-label'
        >
          Add Hobby
        </button>
      </Form>
      {actionData?.message && (
        <h3 className='text-red font-bold text-xl'>
          {actionData?.message} Please{' '}
          <Link className='underline' to='account/login'>
            Login
          </Link>
        </h3>
      )}
    </AppContainer>
  )
}

export default Hobbies
