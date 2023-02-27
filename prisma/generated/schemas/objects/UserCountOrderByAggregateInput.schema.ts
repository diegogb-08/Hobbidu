import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    bio: z.lazy(() => SortOrderSchema).optional(),
    birth_date: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    hobbyIDs: z.lazy(() => SortOrderSchema).optional(),
    eventIDs: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    phone_number: z.lazy(() => SortOrderSchema).optional(),
    profile_img: z.lazy(() => SortOrderSchema).optional(),
    user_name: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const UserCountOrderByAggregateInputObjectSchema = Schema
