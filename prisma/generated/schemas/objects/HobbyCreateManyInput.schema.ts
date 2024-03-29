import { z } from 'zod'
import { HobbyCreateuserIDsInputObjectSchema } from './HobbyCreateuserIDsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateManyInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    userIDs: z.union([z.lazy(() => HobbyCreateuserIDsInputObjectSchema), z.string().array()]).optional()
  })
  .strict()

export const HobbyCreateManyInputObjectSchema = Schema
