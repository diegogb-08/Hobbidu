import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventMinOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    event_date: z.lazy(() => SortOrderSchema).optional(),
    hobbyID: z.lazy(() => SortOrderSchema).optional(),
    hostID: z.lazy(() => SortOrderSchema).optional(),
    maxUsers: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const EventMinOrderByAggregateInputObjectSchema = Schema
