import { z } from 'zod'

export const PostScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'description',
  'hobby_id',
  'image',
  'like',
  'user_id'
])
