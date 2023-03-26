import { z } from 'zod'
import { UserCreateNestedManyWithoutHobbiesInputObjectSchema } from './UserCreateNestedManyWithoutHobbiesInput.schema'
import { EventCreateNestedManyWithoutHobbyInputObjectSchema } from './EventCreateNestedManyWithoutHobbyInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    user: z.lazy(() => UserCreateNestedManyWithoutHobbiesInputObjectSchema).optional(),
    events: z.lazy(() => EventCreateNestedManyWithoutHobbyInputObjectSchema).optional()
  })
  .strict()

export const HobbyCreateInputObjectSchema = Schema
