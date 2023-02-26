import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { HobbyCountOrderByAggregateInputObjectSchema } from './HobbyCountOrderByAggregateInput.schema'
import { HobbyMaxOrderByAggregateInputObjectSchema } from './HobbyMaxOrderByAggregateInput.schema'
import { HobbyMinOrderByAggregateInputObjectSchema } from './HobbyMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    userIDs: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => HobbyCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => HobbyMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => HobbyMinOrderByAggregateInputObjectSchema).optional()
  })
  .strict()

export const HobbyOrderByWithAggregationInputObjectSchema = Schema
