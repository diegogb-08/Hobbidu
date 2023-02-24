import { Chip } from '@mui/material'
import type { Hobby } from '@prisma/client'

import type { DataFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useTransition } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { useState } from 'react'
import { ValidatedForm } from 'remix-validated-form'
import { z } from 'zod'
import TextField from '~/components/Form/TextField'
import { authenticator } from '~/services/auth.server'
import { db } from '~/utils/db.server'
import SubmitButton from '../../components/Buttons/SubmitButton'

const HobbiesSchema = z.object({
  hobbyName: z.string().optional(),
  hobbyIds: z.array(z.string()).optional()
})

const validator = withZod(HobbiesSchema)

export const loader = async ({ request }: DataFunctionArgs) => {
  const clonedRequest = new Request(request)
  const userAuth = await authenticator.isAuthenticated(request, {
    failureRedirect: '/account/login'
  })
  const hobbies = await db.hobby.findMany()
  const result = await validator.validate(clonedRequest)
  const hobbyIds: string[] = result.data?.hobbyIds || []
  const hobbyName = result.data?.hobbyName
  if (hobbyName) {
    const hobbyNameUpperCase = hobbyName.toUpperCase()
    const foundHobby = hobbies.find((_) => _.name === hobbyNameUpperCase)
    if (foundHobby) {
      hobbyIds.push(foundHobby?.id)
    } else {
      const newHobby = await db.hobby.create({
        data: {
          name: hobbyNameUpperCase,
          user_id: userAuth?.user?.id
        }
      })
      hobbyIds.push(newHobby?.id)
    }
  }

  const hobbiesRecord: Record<string, Hobby> = hobbies.reduce((previousHobby, currentHobby) => {
    return {
      ...previousHobby,
      [currentHobby.id]: currentHobby
    }
  }, {})
  return json({ hobbies: hobbiesRecord, hobbyIds, hobbyName })
}

const Hobbies = () => {
  const transition = useTransition()
  const { hobbies, hobbyIds } = useLoaderData<typeof loader>()
  const [selectedHobbyIds, setSelectedHobbyIds] = useState<string[]>([...hobbyIds])
  const isSubmitting = transition.state === 'submitting'

  const handleSelectHobby = (hobbyId: string) => {
    let newHobbyIds = [...selectedHobbyIds]
    if (selectedHobbyIds.includes(hobbyId)) {
      newHobbyIds = selectedHobbyIds.filter((id) => id !== hobbyId)
    } else {
      newHobbyIds.push(hobbyId)
    }
    setSelectedHobbyIds(newHobbyIds)
  }
  console.log(selectedHobbyIds)

  return (
    <ValidatedForm validator={validator} method='get'>
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
      <div className='flex w-full justify-center'>
        <TextField name='hobbyName' type='text' placeholder='Add your missing hobby here. e.g. CLIMBING' />
        <button
          type='submit'
          className='ml-4 h-[38px] w-40 p-4 text-center flex justify-center items-center bg-transparent font-semibold hover:text-fontcolor-white py-2 px-4 border hover:border-transparent rounded hover:bg-primary text-label'
        >
          {isSubmitting ? 'Adding...' : 'Add Hobby'}
        </button>
      </div>
      {/* {actionData?.message && (
        <h3 className='text-red font-bold text-xl'>
          {actionData?.message} Please{' '}
          <Link className='underline' to='/account/login'>
            Login
          </Link>
        </h3>
      )} */}

      {selectedHobbyIds.length > 0 && (
        <div>
          <h3 className='text-lg font-bold pt-6 pb-6'>Selected Hobbies:</h3>
          <div className='flex flex-wrap justify-center'>
            {selectedHobbyIds.map((hobbyId) => {
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
          <h3 className='text-lg font-bold pt-6 pb-6'>Press continue once you select the hobbies you want to follow</h3>
          <div className='w-full flex justify-center'>
            <div className='w-40'>
              <SubmitButton name='hobbyIds' value={selectedHobbyIds} text='Continue' />
            </div>
          </div>
        </div>
      )}
    </ValidatedForm>
  )
}

export default Hobbies
