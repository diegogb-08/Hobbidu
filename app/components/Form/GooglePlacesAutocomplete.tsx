import { useHydrated } from 'remix-utils'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { useId } from 'react'
import { useField } from 'remix-validated-form'

interface Props {
  googleApiKey: string | undefined
  name: string
  title: string
}

export const GooglePlaces = ({ googleApiKey, name, title }: Props) => {
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
            ...getInputProps()
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
