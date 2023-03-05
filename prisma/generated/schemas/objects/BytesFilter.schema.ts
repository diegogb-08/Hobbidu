import { z } from 'zod'
import { NestedBytesFilterObjectSchema } from './NestedBytesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.BytesFilter> = z
  .object({
    equals: z.instanceof(Buffer).optional(),
    in: z.instanceof(Buffer).array().optional(),
    notIn: z.instanceof(Buffer).array().optional(),
    not: z.union([z.instanceof(Buffer), z.lazy(() => NestedBytesFilterObjectSchema)]).optional()
  })
  .strict()

export const BytesFilterObjectSchema = Schema
