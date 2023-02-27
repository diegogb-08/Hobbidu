import { Chip } from '@mui/material'
import { getAllEventsByUserId } from '~/services/events.server'
import { getAllHobbies } from '~/services/hobbies.server'
import { getSession } from '~/services/session.server'
import { GOOGLE_PLACES_API_KEY } from '../../services/constants'
import { redirect } from '@remix-run/server-runtime'
import { Link, useLoaderData } from '@remix-run/react'
import { TextArea } from '~/components/Form/TextArea'
import { useField, ValidatedForm, validationError } from 'remix-validated-form'
import { useState } from 'react'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete'
import SelectForm from '~/components/Form/SelectForm'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import type { ActionFunction, DataFunctionArgs } from '@remix-run/server-runtime'
import type { EventsLoader } from './index'
// import type { Location } from '@prisma/client'
import type { UserAuth } from '~/types/types'
import { GooglePlaces } from '~/components/Form/GooglePlacesAutocomplete'
import type { Location } from '@prisma/client'
import { db } from '~/utils/db.server'
import { EventCreateOneSchema } from 'prisma/generated/schemas'
import { getUserAuthFromSession } from '~/services/user.server'

const ScheduleSchema = z.object({
  title: z.string().min(1, { message: 'Please add a title for the event' }),
  paxNumber: z.coerce.number(),
  description: z
    .string()
    .min(1, { message: 'Please, give as much information as you can, so the joiners can get full info!' }),
  selectedHobbyId: z.string().min(1, { message: 'Please select 1 hobby' }),
  dateTime: z.string().min(1, { message: 'Date and time must be entered' }),
  placeId: z.string().min(1, { message: 'Please select a location' })
})

const validator = withZod(ScheduleSchema)

export const action: ActionFunction = async ({ request }) => {
  const userAuth = await getUserAuthFromSession(request)

  const { data, error } = await validator.validate(await request.formData())
  if (error) {
    return validationError(error)
  }

  const { title, dateTime, description, paxNumber, placeId, selectedHobbyId } = data
  let locationName: string = ''

  const location: Location = await geocodeByPlaceId(placeId)
    .then((results) => {
      locationName = results[0].formatted_address
      return getLatLng(results[0])
    })
    .then(({ lat, lng }) => {
      return {
        name: locationName,
        coordinates: [lng, lat],
        type: 'Point'
      }
    })

  const event = EventCreateOneSchema.parse({
    location,
    title,
    event_date: dateTime,
    description,
    maxUsers: paxNumber,
    hobbyID: selectedHobbyId,
    hostID: userAuth?.user.id,
    userIDs: [userAuth?.user.id],
    users: [userAuth?.user]
  })

  db.event.create({
    data: event.data
  })
  return redirect('/events')
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

// interface Terms {
//   offset: number
//   value: string
// }

// interface LocationValue {
//   label: string
//   value: {
//     description: string
//     referend: string
//     tructured_formatting: {
//       main_text: string
//       secondary_text: string
//     }
//     terms: Terms[]
//     types: string[]
//   }
// }

const paxOptions = Array.from({ length: 10 }, (_v, i) => 1 + i).splice(1)

const Schedule = () => {
  const { error, clearError } = useField('selectedHobbyId', {
    validationBehavior: {
      initial: 'onSubmit',
      whenSubmitted: 'onChange'
    },
    formId: 'schedule'
  })

  const { hobbies, user, googleApiKey } = useLoaderData<ScheduleLoader | undefined>()
  // const [locationValue, setLocationValue] = useState<LocationValue | undefined>()
  // const [location, setLocation] = useState<Location | undefined>()
  // const fetcher = useFetcher()
  const [selectedHobbyId, setSelectedHobbyId] = useState<string | undefined>()

  const handleSelectHobby = (hobbyId: string) => {
    clearError()
    setSelectedHobbyId(hobbyId)
  }

  // const handleSelectLocation = (location: LocationValue) => {
  //   console.log({ location })
  //   clearErrorLocation()
  //   setLocationValue(location)
  //   geocodeByAddress(location?.label)
  //     .then((results) => getLatLng(results[0]))
  //     .then(({ lat, lng }) => {
  //       setLocation({
  //         name: location.label,
  //         coordinates: [lng, lat],
  //         type: 'Point'
  //       })
  //     })
  // }

  // const handleSubmit = () => {
  //   const parsedLocation = JSON.stringify(location)
  //   fetcher.submit({ location: parsedLocation }, { method: 'post' })
  // }

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
        <GooglePlaces title='Location' name='placeId' googleApiKey={googleApiKey} />
        <TextArea
          name='description'
          title='Description'
          description='Try to give as much information as you can, so the joiners can get full info!'
        />
        <SubmitButton name='selectedHobbyId' value={selectedHobbyId} />
      </ValidatedForm>
    </div>
  )
}

export default Schedule
