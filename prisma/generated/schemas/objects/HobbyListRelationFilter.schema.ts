import { z } from 'zod'
import { HobbyWhereInputObjectSchema } from './HobbyWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyListRelationFilter> = z
  .object({
    every: z.lazy(() => HobbyWhereInputObjectSchema).optional(),
    some: z.lazy(() => HobbyWhereInputObjectSchema).optional(),
    none: z.lazy(() => HobbyWhereInputObjectSchema).optional()
  })
  .strict()

export const HobbyListRelationFilterObjectSchema = Schema
