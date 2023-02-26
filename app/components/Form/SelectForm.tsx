import type { FC } from 'react'
import { useField } from 'remix-validated-form'

interface Props {
  name: string
  className?: string
  text?: string
  options: string[] | number[]
  defaultValue?: string | number
}

const SelectForm: FC<Props> = ({ name, text, className, options, defaultValue }) => {
  const { getInputProps, error } = useField(name, {
    validationBehavior: {
      initial: 'onSubmit',
      whenSubmitted: 'onChange'
    }
  })
  return (
    <div className='w-full'>
      <label htmlFor='floatingInput' className='text-black'>
        {text}
      </label>
      <select
        className={`
      block
      w-full
      px-2
      py-2
      text-base
      font-normal
      bg-white bg-clip-padding
      border border-solid
      rounded
      transition
      ease-in-out
      m-0 focus:bg-white focus:border-blue focus:outline-non
      ${error ? 'border-red' : 'border-gray'}
      ${className}
      `}
        id='maxJoiners'
        name='maxJoiners'
        defaultValue={defaultValue}
        {...getInputProps()}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className='h-4 w-full flex items-start pl-2'>
        {error && <span className={`text-xs text-red`}>{error}</span>}
      </div>
    </div>
  )
}

export default SelectForm
