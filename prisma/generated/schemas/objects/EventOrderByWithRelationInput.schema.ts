import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { LocationOrderByInputObjectSchema } from './LocationOrderByInput.schema'
import { HobbyOrderByWithRelationInputObjectSchema } from './HobbyOrderByWithRelationInput.schema'
import { UserOrderByRelationAggregateInputObjectSchema } from './UserOrderByRelationAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    event_date: z.lazy(() => SortOrderSchema).optional(),
    hobbyID: z.lazy(() => SortOrderSchema).optional(),
    hostID: z.lazy(() => SortOrderSchema).optional(),
    userIDs: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => LocationOrderByInputObjectSchema).optional(),
    maxUsers: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    hobby: z.lazy(() => HobbyOrderByWithRelationInputObjectSchema).optional(),
    users: z.lazy(() => UserOrderByRelationAggregateInputObjectSchema).optional()
  })
  .strict()

export const EventOrderByWithRelationInputObjectSchema = Schema
