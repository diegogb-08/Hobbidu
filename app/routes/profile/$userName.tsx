import { useLoaderData } from '@remix-run/react'
import { ProfileImage } from '~/components/ProfileImage'

import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { getUserAuthFromSession } from '~/services/session.server'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import { db } from '~/utils/db.server'

import { UserWithHobbiesSchema } from '~/types/types'
import { validationError } from 'remix-validated-form'

const PofileImageSchema = z.object({
  profile_img: z.instanceof(File)
})
export const UserNameSchema = z.string()

export const profileImageValidator = withZod(PofileImageSchema)

export const action = async ({ request }: DataFunctionArgs) => {
  const userAuth = await getUserAuthFromSession(request)
  const { data, error } = await profileImageValidator.validate(await request.formData())
  if (error) {
    return validationError(error)
  }
  const file = data.profile_img
  const fileData = await file.arrayBuffer()
  try {
    const newImage = await db.file.create({
      data: {
        name: file.name.replaceAll(' ', '_'),
        mimeType: file.type,
        size: file.size,
        data: Buffer.from(fileData)
      }
    })
    const image = await db.file.findUnique({ where: { id: newImage.id } })

    if (image && userAuth?.user.id) {
      const imageData = image?.data
      const profile_img = `data:image/jpeg;base64,${imageData?.toString('base64')}`
      return await db.user.update({
        where: {
          id: userAuth?.user.id
        },
        data: {
          profile_img
        }
      })
    }
  } catch (error) {
    console.error({ error })
    return null
  }
}

export const loader = async ({ params }: DataFunctionArgs) => {
  const response = UserNameSchema.safeParse(params.userName)
  if (!response.success) {
    throw new Response('Error when parsing User at UserSchema', { status: 404 })
  }
  const user = await db.user.findUnique({
    where: {
      user_name: response.data
    },
    include: {
      hobbies: true
    }
  })
  const userResponse = UserWithHobbiesSchema.safeParse(user)
  if (!userResponse.success) {
    throw new Response('User Not Found', { status: 404 })
  }
  return userResponse.data
}

const UserProfile = () => {
  const user = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col w-full h-full items-center'>
      <div className='flex flex-row justify-evenly'>
        <ProfileImage user={user} />
      </div>
    </div>
  )
}

export default UserProfile
