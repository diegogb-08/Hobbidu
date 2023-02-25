import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { FollowerCountOrderByAggregateInputObjectSchema } from './FollowerCountOrderByAggregateInput.schema'
import { FollowerMaxOrderByAggregateInputObjectSchema } from './FollowerMaxOrderByAggregateInput.schema'
import { FollowerMinOrderByAggregateInputObjectSchema } from './FollowerMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FollowerOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    follower_id: z.lazy(() => SortOrderSchema).optional(),
    user_id: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => FollowerCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => FollowerMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => FollowerMinOrderByAggregateInputObjectSchema).optional()
  })
  .strict()

export const FollowerOrderByWithAggregationInputObjectSchema = Schema
