import { IconButton } from '@mui/material'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import { withZod } from '@remix-validated-form/with-zod'
import { useRef } from 'react'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { placeholderImage } from '~/assets/placeholder-image'
import CameraIcon from '~/icons/CameraIcon'
import { db } from '~/utils/db.server'

const base64Image = `data:image/png;base64,${placeholderImage}`

const PofileImageSchema = z.object({
  profile_img: z.instanceof(File)
})

const validator = withZod(PofileImageSchema)

export const action = async ({ request }: DataFunctionArgs) => {
  const { data, error } = await validator.validate(await request.formData())
  console.log('IS THIS FAILING?', { data, error })
  if (error) {
    return validationError(error)
  }
  const file = data.profile_img
  const fileData = await file.arrayBuffer()
  try {
    const response = await db.file.create({
      data: {
        name: file.name,
        mimeType: file.type,
        size: file.size,
        data: Buffer.from(fileData)
      }
    })
    console.log({ response })
  } catch (error) {
    console.error({ error })
  }
}

const ProfileIndex = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleClickCamera = () => {
    inputRef.current?.click()
  }

  console.log(inputRef.current?.value)

  return (
    <div className='flex flex-col w-full h-full items-center'>
      <div className='flex flex-row justify-evenly'>
        <div className='relative'>
          <div className='max-w-[10rem] max-h-[10rem] rounded-full justify-center items-center overflow-hidden shadow-lg z-0 '>
            <img src={base64Image} alt='placeholder profile' />
          </div>
          <ValidatedForm validator={validator} method='post' encType='multipart/form-data'>
            <IconButton
              onClick={handleClickCamera}
              style={{
                position: 'absolute',
                zIndex: 10,
                bottom: -40,
                left: '50%',
                backgroundColor: 'lightgray',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <CameraIcon height='32px' width='32px' />
            </IconButton>
            <input type='file' name='profile_img' className='absolute hidden' ref={inputRef} accept='image/*' />
          </ValidatedForm>
        </div>
      </div>
    </div>
  )
}

export default ProfileIndex
