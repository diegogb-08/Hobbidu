import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  isSubmitting?: boolean
}

const SubmitButton = ({ isSubmitting, text, ...restOfProps }: Props) => {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className='w-full bg-transparent bg-primary font-semibold text-fontcolor-white py-2 px-4 border rounded'
      {...restOfProps}
    >
      {text || (isSubmitting ? 'Submitting...' : 'Submit')}
    </button>
  )
}

export default SubmitButton
