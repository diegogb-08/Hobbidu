import type { ForwardedRef, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { useField } from 'remix-validated-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  className?: string
  text?: string
  type?: HTMLInputTypeAttribute
}

const TextField = forwardRef(
  ({ name, text, className, type, onChange, ...restOfProps }: Props, ref: ForwardedRef<HTMLInputElement>) => {
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
          {...restOfProps}
          {...getInputProps({
            onChange
          })}
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
