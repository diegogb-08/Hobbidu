import type { ForwardedRef, HTMLInputTypeAttribute } from 'react'
import { forwardRef } from 'react'
import { useField } from 'remix-validated-form'

interface Props {
  name: string
  className?: string
  text?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value?: string | number | readonly string[] | undefined
  defaultValue?: string | number | readonly string[] | undefined
}

const TextField = forwardRef(
  ({ name, text, className, placeholder, type, value, defaultValue }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { getInputProps, error } = useField(name, {
      validationBehavior: {
        initial: 'onSubmit',
        whenSubmitted: 'onChange'
      }
    })

    return (
      <div className='w-full'>
        <label htmlFor={name} className='text-black'>
          {text}
        </label>
        <input
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          name={name}
          type={type}
          className={`
        block
        w-full
        px-2
        py-1.5
        text-base
        font-normal
        bg-white bg-clip-padding
        border border-solid
        ${error ? 'border-red' : 'border-gray'}
        rounded
        transition
        ease-in-out
        m-0 focus:bg-white focus:border-blue focus:outline-non ${className}`}
          placeholder={placeholder}
          {...getInputProps()}
        />
        <div className='h-4 w-full flex items-start pl-2'>
          {!!error && <span className='text-xs text-red'>{error}</span>}
        </div>
      </div>
    )
  }
)
TextField.displayName = 'TextField'
export default TextField
