import { z } from 'zod'

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'bio',
  'birth_date',
  'createdAt',
  'updatedAt',
  'email',
  'hobbyIDs',
  'eventIDs',
  'name',
  'password',
  'phone_number',
  'profileImage',
  'user_name'
])
