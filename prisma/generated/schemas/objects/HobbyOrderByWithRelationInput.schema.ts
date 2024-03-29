import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { UserOrderByRelationAggregateInputObjectSchema } from './UserOrderByRelationAggregateInput.schema'
import { EventOrderByRelationAggregateInputObjectSchema } from './EventOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    userIDs: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByRelationAggregateInputObjectSchema).optional(),
    events: z.lazy(() => EventOrderByRelationAggregateInputObjectSchema).optional()
  })
  .strict()

export const HobbyOrderByWithRelationInputObjectSchema = Schema
