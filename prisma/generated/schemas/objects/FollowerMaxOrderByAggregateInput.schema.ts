import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FollowerMaxOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    follower_id: z.lazy(() => SortOrderSchema).optional(),
    user_id: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const FollowerMaxOrderByAggregateInputObjectSchema = Schema
