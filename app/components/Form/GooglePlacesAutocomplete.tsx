import { useHydrated } from 'remix-utils'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useId } from 'react'
import { useField } from 'remix-validated-form'

interface Terms {
  offset: number
  value: string
}

export interface LocationValue {
  label: string
  value: {
    description: string
    referend: string
    place_id: string
    tructured_formatting: {
      main_text: string
      secondary_text: string
    }
    terms: Terms[]
    types: string[]
  }
}

interface Props {
  googleApiKey: string | undefined
  name: string
  title: string
  onChange: (data: LocationValue) => void
}

export const GooglePlaces = ({ googleApiKey, name, title, onChange }: Props) => {
  const isHydrated = useHydrated()
  const scheduleId = useId()
  const { getInputProps, error } = useField(name, {
    validationBehavior: {
      initial: 'onSubmit',
      whenSubmitted: 'onChange'
    }
  })
  return (
    <>
      <label>{title}</label>
      {isHydrated ? (
        <GooglePlacesAutocomplete
          apiKey={googleApiKey}
          apiOptions={{
            language: 'en',
            region: 'es'
          }}
          selectProps={{
            name,
            id: scheduleId,
            instanceId: scheduleId,
            ...getInputProps({ onChange })
          }}
          onLoadFailed={(error) => console.error(error)}
          minLengthAutocomplete={2}
        />
      ) : null}
      <div className='h-4 w-full flex items-start pl-2'>
        {!!error && <span className='text-xs text-red'>{error}</span>}
      </div>
    </>
  )
}
