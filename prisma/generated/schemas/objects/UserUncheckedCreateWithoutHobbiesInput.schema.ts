import { z } from 'zod'
import { UserCreatehobbyIDsInputObjectSchema } from './UserCreatehobbyIDsInput.schema'
import { UserCreateeventIDsInputObjectSchema } from './UserCreateeventIDsInput.schema'
import { LocationNullableCreateEnvelopeInputObjectSchema } from './LocationNullableCreateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'
import { RoleSchema } from '../enums/Role.schema'
import { EventUncheckedCreateNestedManyWithoutUsersInputObjectSchema } from './EventUncheckedCreateNestedManyWithoutUsersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutHobbiesInput> = z
  .object({
    id: z.string().optional(),
    bio: z.string().optional().nullable(),
    birth_date: z.date().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    email: z.string(),
    hobbyIDs: z.union([z.lazy(() => UserCreatehobbyIDsInputObjectSchema), z.string().array()]).optional(),
    eventIDs: z.union([z.lazy(() => UserCreateeventIDsInputObjectSchema), z.string().array()]).optional(),
    location: z
      .union([
        z.lazy(() => LocationNullableCreateEnvelopeInputObjectSchema),
        z.lazy(() => LocationCreateInputObjectSchema)
      ])
      .optional()
      .nullable(),
    name: z.string().optional().nullable(),
    password: z.string(),
    phone_number: z.string().optional().nullable(),
    profile_img: z.string().optional().nullable(),
    user_name: z.string(),
    role: z.lazy(() => RoleSchema).optional(),
    events: z.lazy(() => EventUncheckedCreateNestedManyWithoutUsersInputObjectSchema).optional()
  })
  .strict()

export const UserUncheckedCreateWithoutHobbiesInputObjectSchema = Schema
