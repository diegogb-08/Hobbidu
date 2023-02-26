import { z } from 'zod'
import { UserCreateNestedManyWithoutHobbiesInputObjectSchema } from './UserCreateNestedManyWithoutHobbiesInput.schema'
import { HobbyCreateuserIDsInputObjectSchema } from './HobbyCreateuserIDsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    user: z.lazy(() => UserCreateNestedManyWithoutHobbiesInputObjectSchema).optional(),
    userIDs: z.union([z.lazy(() => HobbyCreateuserIDsInputObjectSchema), z.string().array()]).optional()
  })
  .strict()

export const HobbyCreateInputObjectSchema = Schema
