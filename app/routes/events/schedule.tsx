import { Chip } from '@mui/material'
import { getNextEventsByUserId } from '~/services/events.server'
import { getAllHobbies } from '~/services/hobbies.server'
import { getSession, getUserAuthFromSession } from '~/services/session.server'
import { GOOGLE_PLACES_API_KEY } from '../../services/constants'
import { redirect } from '@remix-run/server-runtime'
import { Link, useLoaderData, useTransition } from '@remix-run/react'
import { TextArea } from '~/components/Form/TextArea'
import { useField, ValidatedForm, validationError } from 'remix-validated-form'
import { useState } from 'react'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'
import SelectForm from '~/components/Form/SelectForm'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import type { HobbiesRecord, UserAuth } from '~/types/types'
import { LocationSchema } from '~/types/types'
import type { LocationValue } from '~/components/Form/GooglePlacesAutocomplete'
import { GooglePlaces } from '~/components/Form/GooglePlacesAutocomplete'
import type { Location } from '@prisma/client'
import { db } from '~/utils/db.server'
import { EventCreateInputObjectSchema } from 'prisma/generated/schemas'
import invariant from 'tiny-invariant'

const ScheduleSchema = z.object({
  title: z.string().min(1, { message: 'Please add a title for the event' }),
  paxNumber: z.coerce.number(),
  description: z
    .string()
    .min(1, { message: 'Please, give as much information as you can, so the joiners can get full info!' }),
  selectedHobbyId: z.string().min(1, { message: 'Please select 1 hobby' }),
  dateTime: z.string().min(1, { message: 'Date and time must be entered' }),
  placeId: z.string().min(1, { message: 'Please select a location' }),
  location: z.string().optional()
})

const validator = withZod(ScheduleSchema)

export const action = async ({ request }: DataFunctionArgs) => {
  const userAuth = await getUserAuthFromSession(request)

  const { data, error } = await validator.validate(await request.formData())
  if (error) {
    return validationError(error)
  }

  const { title, dateTime, description, paxNumber, selectedHobbyId, location } = data
  invariant(typeof location === 'string', 'Location is not assigned correctly')
  const parsedLocation = LocationSchema.parse(JSON.parse(location))
  const event = EventCreateInputObjectSchema.parse({
    location: parsedLocation,
    title,
    event_date: new Date(dateTime),
    description,
    maxUsers: paxNumber,
    hobby: { connect: { id: selectedHobbyId } },
    hostID: userAuth?.user.id,
    userIDs: [userAuth?.user.id],
    users: { connect: { id: userAuth?.user.id } }
  })
  try {
    await db.event.create({
      data: {
        ...event
      }
    })
    return redirect('/events')
  } catch (error) {
    console.error('ERROR:', { error })
    return null
  }
}

type ScheduleLoader = {
  googleApiKey: string | undefined
  hobbies: HobbiesRecord
  events: Event[]
} & UserAuth

export const loader = async ({ request }: DataFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const userAuth = (await session.get('sessionKey')) as UserAuth | undefined

  if (userAuth) {
    const hobbies = await getAllHobbies()
    const events = await getNextEventsByUserId(userAuth.user.id)
    return {
      ...userAuth,
      hobbies,
      events,
      googleApiKey: GOOGLE_PLACES_API_KEY
    }
  }
  return userAuth
}

const paxOptions = Array.from({ length: 10 }, (_v, i) => 1 + i).splice(1)

const Schedule = () => {
  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'
  const { error, clearError } = useField('selectedHobbyId', {
    validationBehavior: {
      initial: 'onSubmit',
      whenSubmitted: 'onChange'
    },
    formId: 'schedule'
  })

  const { hobbies, user, googleApiKey } = useLoaderData<ScheduleLoader | undefined>()
  const [selectedHobbyId, setSelectedHobbyId] = useState<string | undefined>()
  const [location, setLocation] = useState<string | undefined>()
  const handleSelectHobby = (hobbyId: string) => {
    clearError()
    setSelectedHobbyId(hobbyId)
  }

  const handleChangeGooglePlaces = async ({ value, label }: LocationValue) => {
    const location: Location = await geocodeByPlaceId(value.place_id)
      .then((results) => {
        return getLatLng(results[0])
      })
      .then(({ lat, lng }) => {
        return {
          name: label,
          coordinates: [lng, lat],
          type: 'Point'
        }
      })
    const stringifiedLocation = JSON.stringify(location)
    setLocation(stringifiedLocation)
  }

  return (
    <div className='flex justify-center mt-4'>
      <ValidatedForm
        id='schedule'
        validator={validator}
        method='post'
        className='flex-1 border border-gray rounded p-6 bg-white'
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
        <div className='h-4 w-full flex items-start pl-2 justify-center'>
          {!!error && <span className='text-xs text-red'>{error}</span>}
        </div>
        <div className='flex flex-1'>
          <div className='flex flex-initial'>
            <TextField text='Date and time' name='dateTime' type='datetime-local' />
          </div>
          <div className='flex flex-initial flex-col ml-4'>
            <SelectForm text='Max. participants' name='paxNumber' options={paxOptions} defaultValue={2} />
          </div>
        </div>
        <GooglePlaces title='Location' name='placeId' googleApiKey={googleApiKey} onChange={handleChangeGooglePlaces} />
        <TextArea
          name='description'
          title='Description'
          description='Try to give as much information as you can, so the joiners can get full info!'
        />
        <TextField name='location' type='hidden' value={location} />
        <SubmitButton name='selectedHobbyId' value={selectedHobbyId} isSubmitting={isSubmitting} />
      </ValidatedForm>
    </div>
  )
}

export default Schedule
