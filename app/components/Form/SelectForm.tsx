import type { FC, HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLSelectElement> {
  isError?: boolean
  text?: string
  helperText?: string
  options: string[] | number[]
}

const SelectForm: FC<Props> = ({ isError, text, helperText, className, options, ...inputProps }) => {
  return (
    <div className='w-full'>
      <label htmlFor='floatingInput' className='text-black'>
        {text}
      </label>
      <select
        className={`form-control
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
      ${isError ? 'border-red' : 'border-gray'}
      ${className}
      `}
        id='maxJoiners'
        name='maxJoiners'
        defaultValue={2}
        {...inputProps}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className='h-4 w-full flex items-start pl-2'>
        {helperText && <span className={`text-xs ${isError ? 'text-red' : 'text-gray'}`}>{helperText}</span>}
      </div>
    </div>
  )
}

export default SelectForm
