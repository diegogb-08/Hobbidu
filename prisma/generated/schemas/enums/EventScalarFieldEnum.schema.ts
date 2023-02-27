import { z } from 'zod'

export const EventScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'description',
  'event_date',
  'hobbyID',
  'hostID',
  'userIDs',
  'maxUsers',
  'title'
])
