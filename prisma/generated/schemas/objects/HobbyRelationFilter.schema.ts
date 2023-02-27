import { z } from 'zod'
import { HobbyWhereInputObjectSchema } from './HobbyWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyRelationFilter> = z
  .object({
    is: z.lazy(() => HobbyWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => HobbyWhereInputObjectSchema).optional()
  })
  .strict()

export const HobbyRelationFilterObjectSchema = Schema
