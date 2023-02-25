import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
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
    hobbies: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => LocationOrderByInputObjectSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    phone_number: z.lazy(() => SortOrderSchema).optional(),
    profile_img: z.lazy(() => SortOrderSchema).optional(),
    user_name: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const UserOrderByWithRelationInputObjectSchema = Schema
