import { Chip } from '@mui/material'
import type { Hobby } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData, useMatches, useTransition } from '@remix-run/react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '~/components/Form/TextField'
import { authenticator } from '~/services/auth.server'
import { getSession } from '~/services/session.server'
import type { UserAuth } from '~/types/types'
import { db } from '~/utils/db.server'
import SubmitButton from '../../components/Buttons/SubmitButton'

interface ActionData {
  success?: boolean
  hobbyId?: string
  hobby?: FormDataEntryValue | null
  errors?: string
  message?: string
}
export const action: ActionFunction = async ({ request }): Promise<ActionData> => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = (await session.get('sessionKey')) as UserAuth | undefined

  const formData = await request.formData()
  const hobby = formData.get('hobby')
  const hobbyName = (hobby as string)?.toUpperCase()
  if (userAuth?.user?.id) {
    if (hobby) {
      try {
        const newHobby = await db.hobby.create({
          data: {
            name: hobbyName,
            user_id: userAuth?.user?.id
          }
        })
        return { success: true, hobbyId: newHobby.id }
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          console.error(error)
          const existingHobby = await db.hobby.findUnique({
            where: {
              name: hobbyName
            }
          })
          return {
            success: true,
            hobby,
            hobbyId: existingHobby?.id,
            errors: `"${hobbyName}" already exist. It has been selected for you.`
          }
        }
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

  const hobbiesRecord = hobbies.reduce((previousHobby, currentHobby) => {
    return {
      ...previousHobby,
      [currentHobby.id]: currentHobby
    }
  }, {})
  return json({ hobbies: hobbiesRecord })
}

const Hobbies = () => {
  const actionData = useActionData<ActionData>()
  const transition = useTransition()
  const match = useMatches()
  const { hobbies } = useLoaderData<{ hobbies: Record<string, Hobby> }>()
  const [hobbyIds, setHobbyIds] = useState<string[]>(match[0].data?.user?.hobbies)
  const isSubmitting = transition.state === 'submitting'

  const handleSelectHobby = useCallback(
    (hobbyId: string) => {
      let newHobbyIds = [...hobbyIds]
      if (hobbyIds.includes(hobbyId)) {
        newHobbyIds = hobbyIds.filter((id) => id !== hobbyId)
      } else {
        newHobbyIds.push(hobbyId)
      }
      setHobbyIds(newHobbyIds)
    },
    [hobbyIds]
  )

  useEffect(() => {
    if (actionData?.success && actionData?.hobbyId) {
      handleSelectHobby(actionData?.hobbyId)
    }
  }, [actionData, hobbies, handleSelectHobby])

  return (
    <>
      <h2 className='text-xl font-bold pb-6'>Please select the hobbies you want to follow!</h2>
      <div className='flex flex-wrap justify-center'>
        {Object.values(hobbies).map((hobby) => {
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
      <h3 className='text-lg font-bold pt-6 pb-6'>You can't find your hobby? Add it yourself below</h3>
      <Form method='post' className='flex w-full justify-center'>
        <TextField
          name='hobby'
          type='text'
          maxLength={25}
          placeholder='Add your missing hobby here. e.g. CLIMBING'
          pattern='(^[A-Za-z\s]{3,25})'
          isError={!!actionData?.errors}
          defaultValue={actionData?.hobby as string}
          helperText={actionData?.errors}
        />
        <button
          type='submit'
          className='ml-4 h-[38px] w-40 p-4 text-center flex justify-center items-center bg-transparent font-semibold hover:text-fontcolor-white py-2 px-4 border hover:border-transparent rounded hover:bg-primary text-label'
        >
          {isSubmitting ? 'Adding...' : 'Add Hobby'}
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

      {hobbyIds.length > 0 && (
        <div>
          <h3 className='text-lg font-bold pt-6 pb-6'>You can't find your hobby? Add it yourself below</h3>
          <div className='flex flex-wrap justify-center'>
            {hobbyIds.map((hobbyId) => {
              const hobby = hobbies[hobbyId]
              return (
                <Chip
                  style={{ marginRight: '16px', marginBottom: '16px' }}
                  variant='filled'
                  clickable
                  onClick={() => handleSelectHobby(hobby?.id)}
                  key={hobby?.id}
                  label={hobby?.name?.toUpperCase()}
                />
              )
            })}
          </div>
          <Form method='post' action='/'>
            <h3 className='text-lg font-bold pt-6 pb-6'>
              Press continue once you select the hobbies you want to follow
            </h3>
            <div className='w-full flex justify-center'>
              <div className='w-40'>
                <SubmitButton name='hobbyIds' value={hobbyIds} text='Continue' />
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  )
}

export default Hobbies
