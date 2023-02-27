import { useField } from 'remix-validated-form'

interface Props {
  title: string
  description?: string
  cols?: number
  rows?: number
  name: string
  maxLength?: number
}

export const TextArea = ({ name, title, description, cols = 30, rows = 8, maxLength = 3000 }: Props) => {
  const { getInputProps, error } = useField(name, {
    validationBehavior: {
      initial: 'onSubmit',
      whenSubmitted: 'onChange'
    }
  })
  return (
    <div className='flex flex-1 flex-col my-4'>
      <label htmlFor='description'>{title}</label>
      {description ? <span className='text-xs'>{description}</span> : undefined}
      <textarea
        className={`block w-full px-2 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid ${
          error ? 'border-red' : 'border-gray'
        } rounded transition ease-in-out
            m-0 focus:bg-white focus:border-blue focus:outline-non`}
        cols={cols}
        rows={rows}
        name={name}
        maxLength={maxLength}
        {...getInputProps()}
      />
      <div className='h-4 w-full flex items-start pl-2'>
        {!!error && <span className='text-xs text-red'>{error}</span>}
      </div>
    </div>
  )
}
