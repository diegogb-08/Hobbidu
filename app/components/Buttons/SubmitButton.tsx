const SubmitButton = ({ value, name }: { value?: string | number | readonly string[] | undefined; name?: string }) => {
  return (
    <button
      type='submit'
      className='w-full bg-transparent bg-primary font-semibold text-fontcolor-white py-2 px-4 border rounded'
      value={value}
      name={name}
    >
      Submit
    </button>
  )
}

export default SubmitButton
