import { z } from 'zod'

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'bio',
  'birth_date',
  'createdAt',
  'updatedAt',
  'email',
  'hobbyIDs',
  'name',
  'password',
  'phone_number',
  'profile_img',
  'user_name'
])
