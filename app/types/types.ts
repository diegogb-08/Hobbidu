import type { Hobby, Location, User } from '@prisma/client'
import { LocationTypeSchema, RoleSchema } from 'prisma/generated/schemas'
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
export const CoercedDate = z.coerce.date()
export const CoercedString = z.coerce.string()

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

export const UserWithHobbiesSchema: z.ZodType<
  User & {
    hobbies: Hobby[]
  }
> = z.object({
  id: z.string(),
  bio: z.string().nullable(),
  birth_date: CoercedDate.nullable(),
  createdAt: CoercedDate,
  updatedAt: CoercedDate,
  email: z.string(),
  hobbies: z.array(HobbySchema),
  hobbyIDs: z.array(z.string()),
  eventIDs: z.array(z.string()),
  location: LocationSchema.nullable(),
  name: z.string().nullable(),
  password: z.string(),
  phone_number: z.string().nullable(),
  profile_img: z.string().nullable(),
  user_name: z.string(),
  role: RoleSchema
})

export const UserAuthSchema = z
  .object({
    user: UserWithHobbiesSchema,
    token: z.string()
  })
  .nullable()

export type c = z.infer<typeof UserWithHobbiesSchema>
export type UserAuth = z.infer<typeof UserAuthSchema>

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
  users: z.array(UserWithHobbiesSchema),
  location: LocationSchema,
  maxUsers: z.number(),
  title: z.string()
})

export type ZodEventWithHobbyAndUsers = z.infer<typeof EventWithHobbyAndUsers>
