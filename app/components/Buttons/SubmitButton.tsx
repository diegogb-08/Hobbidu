import type { ButtonHTMLAttributes, LegacyRef } from 'react'
import { forwardRef } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  isSubmitting?: boolean
}

const SubmitButton = forwardRef(({ isSubmitting, text, ...restOfProps }: Props, ref: LegacyRef<HTMLButtonElement>) => {
  return (
    <button
      ref={ref}
      type='submit'
      disabled={isSubmitting}
      className='w-full bg-transparent bg-primary font-semibold text-fontcolor-white py-2 px-4 border rounded'
      {...restOfProps}
    >
      {text || (isSubmitting ? 'Submitting...' : 'Submit')}
    </button>
  )
})
SubmitButton.displayName = 'SubmitButton'

export default SubmitButton
