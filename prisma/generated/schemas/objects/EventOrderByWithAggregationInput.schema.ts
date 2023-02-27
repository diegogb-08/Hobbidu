import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { EventCountOrderByAggregateInputObjectSchema } from './EventCountOrderByAggregateInput.schema'
import { EventAvgOrderByAggregateInputObjectSchema } from './EventAvgOrderByAggregateInput.schema'
import { EventMaxOrderByAggregateInputObjectSchema } from './EventMaxOrderByAggregateInput.schema'
import { EventMinOrderByAggregateInputObjectSchema } from './EventMinOrderByAggregateInput.schema'
import { EventSumOrderByAggregateInputObjectSchema } from './EventSumOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    event_date: z.lazy(() => SortOrderSchema).optional(),
    hobbyID: z.lazy(() => SortOrderSchema).optional(),
    hostID: z.lazy(() => SortOrderSchema).optional(),
    userIDs: z.lazy(() => SortOrderSchema).optional(),
    maxUsers: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => EventCountOrderByAggregateInputObjectSchema).optional(),
    _avg: z.lazy(() => EventAvgOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => EventMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => EventMinOrderByAggregateInputObjectSchema).optional(),
    _sum: z.lazy(() => EventSumOrderByAggregateInputObjectSchema).optional()
  })
  .strict()

export const EventOrderByWithAggregationInputObjectSchema = Schema
