import { IconButton } from '@mui/material'
import { useLoaderData } from '@remix-run/react'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import { withZod } from '@remix-validated-form/with-zod'
import { useRef } from 'react'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { placeholderImage } from '~/assets/placeholder-image'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import CameraIcon from '~/icons/CameraIcon'
import { getUserAuthFromSession } from '~/services/session.server'
import { db } from '~/utils/db.server'

const base64Image = `data:image/png;base64,${placeholderImage}`

const PofileImageSchema = z.object({
  profile_img: z.instanceof(File)
})
export const UserNameSchema = z.string()

const validator = withZod(PofileImageSchema)

export const action = async ({ request }: DataFunctionArgs) => {
  const userAuth = await getUserAuthFromSession(request)
  const { data, error } = await validator.validate(await request.formData())
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
  return db.user.findUnique({
    where: {
      user_name: response.data
    }
  })
}

const UserProfile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const user = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col w-full h-full items-center'>
      <div className='flex flex-row justify-evenly'>
        <div className='relative'>
          <div className='max-w-[10rem] max-h-[10rem] rounded-full justify-center items-center overflow-hidden shadow-lg z-0 '>
            {!user?.profile_img ? (
              <img src={base64Image} alt='placeholder profile' />
            ) : (
              <img src={user.profile_img} alt={user.user_name} />
            )}
          </div>
          <ValidatedForm validator={validator} method='post' encType='multipart/form-data'>
            <IconButton
              onClick={() => inputRef.current?.click()}
              style={{
                position: 'absolute',
                zIndex: 10,
                right: -45,
                bottom: '25%',
                backgroundColor: 'lightgray',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <CameraIcon height='32px' width='32px' />
            </IconButton>
            <TextField
              type='file'
              name='profile_img'
              className='absolute hidden'
              ref={inputRef}
              accept='image/*'
              onChange={() => buttonRef.current?.click()}
            />
            <SubmitButton ref={buttonRef} className='hidden' />
          </ValidatedForm>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
