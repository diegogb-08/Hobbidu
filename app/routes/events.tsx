import { Outlet, useLoaderData, useParams } from '@remix-run/react'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import { useEffect, useRef, useState } from 'react'
import AppContainer from '~/components/Layouts/AppContainer'
import { Chip } from '@mui/material'
import LinkButton from '~/components/Buttons/LinkButton'
import AddIcon from '~/icons/AddIcon'

import { authenticator } from '~/services/auth.server'

export const loader = async ({ request }: DataFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/account/login'
  })
}
const Events = () => {
  const params = useParams()
  const userId = params.userId
  const data = useLoaderData<typeof loader>()
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseOver = () => setIsHovered(true)
  const handleMouseOut = () => setIsHovered(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [userId])

  return (
    <AppContainer>
      <div className='flex flex-col w-full h-full'>
        <h2 className='text-2xl text-center font-bold'>Welcome, {data?.user?.name} 👋</h2>
        {!!userId && (
          <div className='flex w-full justify-center mt-4'>
            <div className='flex flex-col lg:inline-block border border-gray rounded p-6'>
              <h1 className='font-bold text-lg'>This are the hobbies you can create events</h1>
              <div className='flex flex-wrap justify-center mt-4'>
                {data?.user.hobbies?.map((hobby) => {
                  return (
                    <Chip
                      style={{ marginRight: '16px', marginBottom: '16px' }}
                      variant='filled'
                      key={hobby?.id}
                      label={hobby?.name?.toUpperCase()}
                      color='success'
                    />
                  )
                })}
              </div>
              <div className='flex justify-center'>
                <LinkButton to='create' color='primary' ref={ref} onClick={handleMouseOut}>
                  <div className='flex flex-row flex-1'>
                    <AddIcon color={isHovered ? '#ffffff' : undefined} style={{ marginRight: '8px' }} />
                    <span>Create Event</span>
                  </div>
                </LinkButton>
              </div>
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </AppContainer>
  )
}

export default Events
