import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    event_date: z.lazy(() => SortOrderSchema).optional(),
    hobby_id: z.lazy(() => SortOrderSchema).optional(),
    joiners: z.lazy(() => SortOrderSchema).optional(),
    maxJoiners: z.lazy(() => SortOrderSchema).optional(),
    seats: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    user_id: z.lazy(() => SortOrderSchema).optional(),
    vehicle: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const EventCountOrderByAggregateInputObjectSchema = Schema
