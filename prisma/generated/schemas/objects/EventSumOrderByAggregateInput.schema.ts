import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventSumOrderByAggregateInput> = z
  .object({
    maxJoiners: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const EventSumOrderByAggregateInputObjectSchema = Schema
