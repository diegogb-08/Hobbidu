import GoogleIcon from '~/icons/GoogleIcon'

const GoogleButton = () => {
  return (
    <button
      type='submit'
      className='flex flex-row justify-center border border-gray border-solid py-2 px-4 w-full rounded'
    >
      <GoogleIcon style={{ marginRight: '1rem' }} />
      Sign in with Google
    </button>
  )
}

export default GoogleButton
