import { Chip } from '@mui/material'
import { Form, Link, useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/server-runtime'
import { useId, useState } from 'react'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { getAllEventsByUserId } from '~/services/events.server'
import { getAllHobbies } from '~/services/hobbies.server'
import { getSession } from '~/services/session.server'
import type { UserAuth } from '~/types/types'
import type { EventsLoader } from './index'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { GOOGLE_MAPS_API_KEY } from '../../services/constants'

interface ScheduleLoader extends EventsLoader {
  googleApiKey: string | undefined
}

export const loader: LoaderFunction = async ({ request }): Promise<ScheduleLoader | undefined> => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = (await session.get('sessionKey')) as UserAuth | undefined

  if (userAuth) {
    const hobbies = await getAllHobbies()
    const events = await getAllEventsByUserId(userAuth.user.id)
    return {
      ...userAuth,
      hobbies,
      events,
      googleApiKey: GOOGLE_MAPS_API_KEY
    }
  }
  return userAuth
}

const Schedule = () => {
  const scheduleId = useId()
  const { hobbies, user, googleApiKey } = useLoaderData<ScheduleLoader | undefined>()
  const [value, setValue] = useState<string[] | null>(null)

  const [selectedHobbyId, setSelectedHobbyId] = useState<string | undefined>()

  const handleSelectHobby = (hobbyId: string) => {
    setSelectedHobbyId(hobbyId)
  }

  return (
    <div className='flex justify-center mt-4'>
      <Form method='post' className='flex-1 border border-gray rounded p-6'>
        <Link to='/events' className='hover:underline text-fontcolor1 hover:text-fontcolor2'>
          Go Back
        </Link>
        <h2 className='text-xl text-center font-bold text-fontcolor1'>Create an Event 🗓️</h2>
        <TextField text='Title' name='title' required />
        <label>Select 1 of your hobbies below:</label>
        <h3 className='flex flex-wrap justify-center'>
          {user.hobbies.map((hobbyId) => {
            const hobby = hobbies[hobbyId]
            return (
              <Chip
                style={{ marginRight: '16px', marginBottom: '16px' }}
                variant={selectedHobbyId === hobby.id ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleSelectHobby(hobby.id)}
                key={hobby.id}
                label={hobby.name.toUpperCase()}
              />
            )
          })}
        </h3>
        <TextField text='Date and time' name='dateTime' type='datetime-local' required />
        <label>Location</label>
        <GooglePlacesAutocomplete
          apiKey={googleApiKey}
          apiOptions={{
            id: scheduleId
          }}
          selectProps={{
            value,
            onChange: setValue
          }}
          onLoadFailed={(error) => console.error(error)}
        />
        <SubmitButton name='selectedHobbyId' value={selectedHobbyId} />
      </Form>
    </div>
  )
}

export default Schedule
