import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { LocationOrderByInputObjectSchema } from './LocationOrderByInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    hobby_id: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    like: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => LocationOrderByInputObjectSchema).optional(),
    user_id: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const PostOrderByWithRelationInputObjectSchema = Schema
