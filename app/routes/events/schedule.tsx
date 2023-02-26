import { Chip } from '@mui/material'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import type { ActionFunction, DataFunctionArgs } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { useEffect, useId, useState } from 'react'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import { getAllEventsByUserId } from '~/services/events.server'
import { getAllHobbies } from '~/services/hobbies.server'
import { getSession } from '~/services/session.server'
import type { UserAuth } from '~/types/types'
import type { EventsLoader } from './index'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { GOOGLE_PLACES_API_KEY } from '../../services/constants'
import type { Location } from '@prisma/client'
import SelectForm from '~/components/Form/SelectForm'
import { useField, ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { withZod } from '@remix-validated-form/with-zod'
import { useHydrated } from 'remix-utils'

const ScheduleSchema = z.object({
  title: z.string().min(1, { message: 'Please add a title for the event' }),
  paxNumber: z.coerce.number(),
  description: z.string().min(1),
  selectedHobbyId: z.string().min(1, { message: 'Please select 1 hobby' }),
  dateTime: z.string().min(1, { message: 'Date and time must be entered' }),
  location: z.string().min(1)
})

const validator = withZod(ScheduleSchema)

export const action: ActionFunction = async ({ request }) => {
  const { data, error } = await validator.validate(await request.formData())
  if (error) {
    return validationError(error)
  }

  return json({
    ...data
  })
}

interface ScheduleLoader extends EventsLoader {
  googleApiKey: string | undefined
}

export const loader = async ({ request }: DataFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = (await session.get('sessionKey')) as UserAuth | undefined

  if (userAuth) {
    const hobbies = await getAllHobbies()
    const events = await getAllEventsByUserId(userAuth.user.id)
    return {
      ...userAuth,
      hobbies,
      events,
      googleApiKey: GOOGLE_PLACES_API_KEY
    }
  }
  return userAuth
}

interface Terms {
  offset: number
  value: string
}

interface LocationValue {
  label: string
  value: {
    description: string
    referend: string
    tructured_formatting: {
      main_text: string
      secondary_text: string
    }
    terms: Terms[]
    types: string[]
  }
}

const paxOptions = Array.from({ length: 10 }, (_v, i) => 1 + i).splice(1)

const Schedule = () => {
  const { error, clearError } = useField('selectedHobbyId', {
    validationBehavior: {
      initial: 'onSubmit',
      whenSubmitted: 'onChange'
    },
    formId: 'schedule'
  })
  // const { error: errorLocation, clearError: clearErrorLocation } = useField('location', {
  //   validationBehavior: {
  //     initial: 'onSubmit',
  //     whenSubmitted: 'onChange'
  //   },
  //   formId: 'schedule'
  // })
  const isHydrated = useHydrated()
  const scheduleId = useId()
  const { hobbies, user, googleApiKey } = useLoaderData<ScheduleLoader | undefined>()
  const [locationValue, setLocationValue] = useState<LocationValue | undefined>()
  const [location, setLocation] = useState<Location | undefined>()
  const fetcher = useFetcher()
  const [selectedHobbyId, setSelectedHobbyId] = useState<string | undefined>()

  const handleSelectHobby = (hobbyId: string) => {
    clearError()
    setSelectedHobbyId(hobbyId)
  }

  const handleSubmit = () => {
    const parsedLocation = JSON.stringify(location)
    fetcher.submit({ location: parsedLocation }, { method: 'post' })
  }

  useEffect(() => {
    if (locationValue?.label) {
      geocodeByAddress(locationValue?.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setLocation({
            name: locationValue.label,
            coordinates: [lng, lat],
            type: 'Point'
          })
        })
    }
  }, [locationValue?.label])

  console.log({ error })

  return (
    <div className='flex justify-center mt-4'>
      <ValidatedForm
        id='schedule'
        validator={validator}
        method='post'
        className='flex-1 border border-gray rounded p-6 bg-white'
        onSubmit={handleSubmit}
      >
        <Link to='/events' className='hover:underline text-fontcolor1 hover:text-fontcolor2'>
          Go Back
        </Link>
        <h2 className='text-xl text-center font-bold text-fontcolor1'>Create an Event 🗓️</h2>
        <TextField text='Title' name='title' />
        <label>Select 1 of your hobbies below:</label>
        <h3 className='flex flex-wrap justify-center'>
          {user.hobbyIDs.map((hobbyId) => {
            const hobby = hobbies[hobbyId]
            return (
              <Chip
                style={{ marginRight: '16px', marginBottom: '16px' }}
                variant={selectedHobbyId === hobby.id ? 'filled' : 'outlined'}
                clickable
                onClick={() => handleSelectHobby(hobby.id)}
                key={hobby.id}
                label={hobby.name.toUpperCase()}
                color='success'
              />
            )
          })}
        </h3>
        {error && (
          <div className='w-full flex justify-center text-xs'>
            <span className='text-red text-center'>{error}</span>
          </div>
        )}
        <div className='flex flex-1'>
          <div className='flex flex-initial'>
            <TextField text='Date and time' name='dateTime' type='datetime-local' />
          </div>
          <div className='flex flex-initial flex-col ml-4'>
            <SelectForm text='Max. participants' name='paxNumber' options={paxOptions} defaultValue={2} />
          </div>
        </div>
        <label>Location</label>
        {isHydrated ? (
          <GooglePlacesAutocomplete
            apiKey={googleApiKey}
            apiOptions={{
              language: 'en',
              region: 'es'
            }}
            selectProps={{
              id: scheduleId,
              instanceId: scheduleId,
              value: locationValue,
              onChange: setLocationValue
            }}
            onLoadFailed={(error) => console.error(error)}
            minLengthAutocomplete={2}
          />
        ) : null}

        <div className='flex flex-1 flex-col my-4'>
          <label htmlFor='description'>Description</label>
          <span className='text-xs'>Try to give as much information as you can so the joiners can get full info!</span>
          <textarea
            className='block w-full px-2 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray rounded transition ease-in-out
                    m-0 focus:bg-white focus:border-blue focus:outline-non'
            cols={30}
            rows={8}
            name='description'
            maxLength={3000}
          />
        </div>
        <SubmitButton name='selectedHobbyId' value={selectedHobbyId} />
      </ValidatedForm>
    </div>
  )
}

export default Schedule
