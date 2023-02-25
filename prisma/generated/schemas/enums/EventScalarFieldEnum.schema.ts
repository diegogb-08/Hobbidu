import { z } from 'zod'

export const EventScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'description',
  'event_date',
  'hobby_id',
  'joiners',
  'maxJoiners',
  'seats',
  'title',
  'user_id',
  'vehicle'
])
