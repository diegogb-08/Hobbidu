import type { Hobby, Location } from '@prisma/client'
import { LocationTypeSchema } from 'prisma/generated/schemas'
import { z } from 'zod'

export enum AuthStrategy {
  STANDARD = 'standard',
  GOOGLE = 'google'
}

export interface FormValues {
  name?: FormDataEntryValue | null
  user_name?: FormDataEntryValue | null
  email?: FormDataEntryValue | null
  password?: FormDataEntryValue | null
}
export const CoercedDate = z.coerce.string()

export type ZodCoercedDate = z.infer<typeof CoercedDate>

export const HobbySchema = z.object({
  id: z.string(),
  createdAt: CoercedDate,
  updatedAt: CoercedDate,
  name: z.string(),
  userIDs: z.array(z.string())
})

export type ZodHobby = z.infer<typeof HobbySchema>

export const LocationSchema: z.ZodType<Location> = z.object({
  coordinates: z.tuple([z.number(), z.number()]),
  name: z.string(),
  type: LocationTypeSchema
})

export const UserSchema = z.object({
  id: z.string(),
  bio: z.string().nullable(),
  birth_date: CoercedDate.nullable(),
  createdAt: CoercedDate,
  updatedAt: CoercedDate,
  email: z.string(),
  hobbies: z.array(HobbySchema).optional(),
  hobbyIDs: z.array(z.string()),
  eventIDs: z.array(z.string()),
  location: LocationSchema.nullable(),
  name: z.string().nullable(),
  password: z.string(),
  phone_number: z.string().nullable(),
  profile_img: z.string().nullable(),
  user_name: z.string()
})

export const UserAuthSchema = z
  .object({
    user: UserSchema,
    token: z.string()
  })
  .nullable()

export type UserAuth = z.infer<typeof UserAuthSchema>
export type ZodUser = z.infer<typeof UserSchema>

export type HobbiesRecord = Record<string, Hobby>

export const EventWithHobbyAndUsers = z.object({
  id: z.string(),
  createdAt: CoercedDate,
  updatedAt: CoercedDate,
  description: z.string(),
  event_date: CoercedDate,
  hobbyID: z.string(),
  hobby: HobbySchema,
  hostID: z.string(),
  userIDs: z.array(z.string()),
  users: z.array(UserSchema),
  location: LocationSchema,
  maxUsers: z.number(),
  title: z.string()
})

export type ZodEventWithHobbyAndUsers = z.infer<typeof EventWithHobbyAndUsers>
