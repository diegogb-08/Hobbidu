import { Link } from '@remix-run/react'

const Schedule = () => {
  return (
    <div className='flex justify-center mt-4'>
      <div className='flex-1 border border-gray rounded p-6'>
        <Link to='/events' className='hover:underline text-fontcolor1 hover:text-fontcolor2'>
          Go Back
        </Link>
        <h2 className='text-xl text-center font-bold text-fontcolor1'>Create an Event 🗓️</h2>
      </div>
    </div>
  )
}

export default Schedule
