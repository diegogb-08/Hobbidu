import { useCallback, useRef, useState, useEffect, useId } from 'react'
import { Chip } from '@mui/material'
import type { Hobby } from '@prisma/client'

import type { DataFunctionArgs } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { useActionData, useLoaderData, useTransition } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { getFormData } from 'remix-params-helper'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import TextField from '~/components/Form/TextField'
import { authenticator } from '~/services/auth.server'
import { db } from '~/utils/db.server'
import SubmitButton from '../../components/Buttons/SubmitButton'
import { commitSession, getSession } from '~/services/session.server'
import { getUserAuthFromSession } from '~/services/user.server'

const HobbiesSchema = z.object({
  _action: z.enum(['find', 'update']),
  hobbyName: z.string().optional(),
  hobbyIDs: z.array(z.string()).optional()
})

const validator = withZod(HobbiesSchema)

export const action = async ({ request }: DataFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = await getUserAuthFromSession(request)
  const hobbies = await db.hobby.findMany()
  const result = await getFormData(request, HobbiesSchema)
  let hobbyName: string | undefined
  let hobbyId: string | null = null
  if (result.success && userAuth?.user) {
    hobbyName = result.data?.hobbyName
    const _action = result.data?._action
    if (_action === 'find') {
      if (hobbyName) {
        const hobbyNameUpperCase = hobbyName.toUpperCase()
        const foundHobby = hobbies.find((_) => _.name === hobbyNameUpperCase)
        if (foundHobby) {
          hobbyId = foundHobby?.id
        } else {
          const newHobby = await db.hobby.create({
            data: {
              name: hobbyNameUpperCase,
              userIDs: [userAuth?.user?.id]
            }
          })
          hobbyId = newHobby?.id
        }
      }
      return hobbyId
    } else {
      try {
        const hobbyIDs = result.data.hobbyIDs
        const userUpdated = await db.user.update({
          where: { id: userAuth.user.id },
          data: {
            hobbyIDs
          }
        })
        session.set(authenticator.sessionKey, { user: userUpdated, token: userAuth.token })
        const headers = new Headers({ 'Set-Cookie': await commitSession(session) })
        return redirect('/', { headers })
      } catch (error) {
        console.error({ error })
        return redirect('/account/login')
      }
    }
  }
  return null
}

export const loader = async ({ request }: DataFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/account/login'
  })
  const hobbies = await db.hobby.findMany()

  const hobbiesRecord: Record<string, Hobby> = hobbies.reduce((previousHobby, currentHobby) => {
    return {
      ...previousHobby,
      [currentHobby.id]: currentHobby
    }
  }, {})
  return json({ hobbies: hobbiesRecord })
}

const Hobbies = () => {
  const id = useId()
  const formRef = useRef<HTMLFormElement | null>(null)

  const transition = useTransition()
  const { hobbies } = useLoaderData<typeof loader>()
  const hobbyId = useActionData<typeof action>()
  const isSubmitting = transition.state === 'submitting'
  const [hobbyIds, setHobbyIds] = useState<string[]>([])

  const handleClickChip = useCallback(
    (hobbyId: string) => {
      let newHobbyIds = [...hobbyIds]
      if (hobbyId) {
        if (hobbyIds.includes(hobbyId)) {
          newHobbyIds = newHobbyIds.filter((id) => id !== hobbyId)
        } else {
          newHobbyIds.push(hobbyId)
        }
      }
      setHobbyIds(newHobbyIds)
    },
    [hobbyIds]
  )

  useEffect(() => {
    if (hobbyId && typeof hobbyId === 'string') {
      handleClickChip(hobbyId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hobbyId])

  return (
    <ValidatedForm validator={validator} method='post' formRef={formRef}>
      <h2 className='text-xl font-bold pb-6'>Please select the hobbies you want to follow!</h2>
      <div className='flex flex-wrap justify-center'>
        {Object.values(hobbies).map((hobby) => {
          const hobbyId = hobby.id
          return (
            <Chip
              style={{ marginRight: '16px', marginBottom: '16px' }}
              variant={hobbyIds.includes(hobbyId) ? 'filled' : 'outlined'}
              clickable
              onClick={() => handleClickChip(hobbyId)}
              key={hobbyId}
              label={hobby.name.toUpperCase()}
              color='success'
            />
          )
        })}
      </div>
      <h3 className='text-lg font-bold pt-6 pb-6'>You can't find your hobby? Add it yourself below</h3>
      <div className='flex w-full justify-center'>
        <TextField name='hobbyName' type='text' placeholder='Add your missing hobby here. e.g. CLIMBING' />
        <button
          name='_action'
          value='find'
          type='submit'
          className='ml-4 h-[38px] w-40 p-4 text-center flex justify-center items-center bg-transparent font-semibold hover:text-fontcolor-white py-2 px-4 border hover:border-transparent rounded hover:bg-primary text-label'
        >
          {isSubmitting ? 'Adding...' : 'Add Hobby'}
        </button>
      </div>
      {hobbyIds.length > 0 && (
        <div>
          <h3 className='text-lg font-bold pt-6 pb-6'>Selected Hobbies:</h3>
          <div className='flex flex-wrap justify-center'>
            {hobbyIds.map((hobbyId) => {
              const hobby = hobbies[hobbyId]
              return (
                <Chip
                  style={{ marginRight: '16px', marginBottom: '16px' }}
                  variant='filled'
                  clickable
                  onClick={() => handleClickChip(hobbyId)}
                  key={hobby?.id + id}
                  label={hobby?.name?.toUpperCase()}
                  color='success'
                />
              )
            })}
          </div>
          <h3 className='text-lg font-bold pt-6 pb-6'>Press continue once you select the hobbies you want to follow</h3>
          <div className='w-full flex justify-center'>
            {hobbyIds.map((hobbyId, index) => {
              return (
                <TextField
                  key={index + hobbyId}
                  name='hobbyIDs'
                  value={hobbyId}
                  type='hidden'
                  placeholder='Add your missing hobby here. e.g. CLIMBING'
                />
              )
            })}
            <div className='w-40'>
              <SubmitButton name='_action' value='update' text='Continue' />
            </div>
          </div>
        </div>
      )}
    </ValidatedForm>
  )
}

export default Hobbies
