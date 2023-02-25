import { z } from 'zod'

export const CommentScalarFieldEnumSchema = z.enum([
  'id',
  'content',
  'createdAt',
  'updatedAt',
  'event_id',
  'post_id',
  'user_id'
])
