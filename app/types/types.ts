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

const LocationSchema: z.ZodType<Location> = z.object({
  coordinates: z.tuple([z.number(), z.number()]),
  name: z.string(),
  type: LocationTypeSchema
})

export const UserSchema = z.object({
  id: z.string(),
  bio: z.string().nullable(),
  birth_date: z.date().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  email: z.string(),
  hobbies: z.array(z.string()).optional(),
  hobbyIDs: z.array(z.string()),
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
