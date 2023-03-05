import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    mimeType: z.lazy(() => SortOrderSchema).optional(),
    size: z.lazy(() => SortOrderSchema).optional(),
    data: z.lazy(() => SortOrderSchema).optional()
  })
  .strict()

export const FileCountOrderByAggregateInputObjectSchema = Schema
