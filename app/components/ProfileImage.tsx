import { IconButton } from '@mui/material'
import { ValidatedForm } from 'remix-validated-form'
import type { ZodUserWithHobbies } from '~/types/types'
import { useRef } from 'react'
import { placeholderImage } from '~/assets/placeholder-image'
import SubmitButton from '~/components/Buttons/SubmitButton'
import TextField from '~/components/Form/TextField'
import CameraIcon from '~/icons/CameraIcon'
import { profileImageValidator } from '~/routes/profile/$userName'
import { useTransition } from '@remix-run/react'
import { motion } from 'framer-motion'

const base64Image = `data:image/png;base64,${placeholderImage}`

interface Props {
  user: ZodUserWithHobbies
}

export const ProfileImage = ({ user }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const transition = useTransition()
  const isPending = transition.state !== 'idle'

  return (
    <div className='relative'>
      <div
        className={`w-[10rem] h-[10rem] rounded-full flex justify-center items-center overflow-hidden shadow-lg z-0`}
      >
        <motion.img
          initial={{ width: '10rem', opacity: 0 }}
          animate={{ opacity: isPending ? 0.2 : 1 }}
          transition={{ opacity: { delay: 0.5, duration: 0.4 } }}
          src={user.profile_img || base64Image}
          alt={user.user_name}
          className={`w-full ${isPending ? 'grayscale-[50%]' : ''}`}
        />
      </div>
      <ValidatedForm validator={profileImageValidator} method='post' encType='multipart/form-data'>
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
  )
}
