import { z } from 'zod'
import { UserCreateNestedManyWithoutHobbiesInputObjectSchema } from './UserCreateNestedManyWithoutHobbiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateWithoutEventsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    user: z.lazy(() => UserCreateNestedManyWithoutHobbiesInputObjectSchema).optional()
  })
  .strict()

export const HobbyCreateWithoutEventsInputObjectSchema = Schema
