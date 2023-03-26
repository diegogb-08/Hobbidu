import { z } from 'zod'
import { LocationNullableCreateEnvelopeInputObjectSchema } from './LocationNullableCreateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'
import { RoleSchema } from '../enums/Role.schema'
import { HobbyCreateNestedManyWithoutUserInputObjectSchema } from './HobbyCreateNestedManyWithoutUserInput.schema'
import { EventCreateNestedManyWithoutUsersInputObjectSchema } from './EventCreateNestedManyWithoutUsersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().optional(),
    bio: z.string().optional().nullable(),
    birth_date: z.date().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    email: z.string(),
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
    hobbies: z.lazy(() => HobbyCreateNestedManyWithoutUserInputObjectSchema).optional(),
    events: z.lazy(() => EventCreateNestedManyWithoutUsersInputObjectSchema).optional()
  })
  .strict()

export const UserCreateInputObjectSchema = Schema
