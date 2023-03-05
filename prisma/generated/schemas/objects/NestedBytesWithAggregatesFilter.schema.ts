import { z } from 'zod'
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema'
import { NestedBytesFilterObjectSchema } from './NestedBytesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.NestedBytesWithAggregatesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z.instanceof(Buffer).array().optional(),
    notIn: z.instanceof(Buffer).array().optional(),
    not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesWithAggregatesFilterObjectSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedBytesFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedBytesFilterObjectSchema).optional()
  })
  .strict()

export const NestedBytesWithAggregatesFilterObjectSchema = Schema
