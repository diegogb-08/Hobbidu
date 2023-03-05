import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { HobbyOrderByRelationAggregateInputObjectSchema } from './HobbyOrderByRelationAggregateInput.schema'
import { EventOrderByRelationAggregateInputObjectSchema } from './EventOrderByRelationAggregateInput.schema'
import { LocationOrderByInputObjectSchema } from './LocationOrderByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    bio: z.lazy(() => SortOrderSchema).optional(),
    birth_date: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    hobbies: z.lazy(() => HobbyOrderByRelationAggregateInputObjectSchema).optional(),
    hobbyIDs: z.lazy(() => SortOrderSchema).optional(),
    events: z.lazy(() => EventOrderByRelationAggregateInputObjectSchema).optional(),
    eventIDs: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => LocationOrderByInputObjectSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    phone_number: z.lazy(() => SortOrderSchema).optional(),
    profileImage: z.lazy(() => SortOrderSchema).optional(),
    user_name: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const UserOrderByWithRelationInputObjectSchema = Schema
