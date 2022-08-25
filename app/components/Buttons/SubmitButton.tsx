import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean
}

const SubmitButton = ({ isSubmitting, ...restOfProps }: Props) => {
  return (
    <button
      type='submit'
      className='w-full bg-transparent bg-primary font-semibold text-fontcolor-white py-2 px-4 border rounded'
      {...restOfProps}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  )
}

export default SubmitButton
