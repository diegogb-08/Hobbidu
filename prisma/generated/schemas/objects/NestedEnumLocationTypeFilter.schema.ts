import { z } from 'zod'
import { LocationTypeSchema } from '../enums/LocationType.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.NestedEnumLocationTypeFilter> = z
  .object({
    equals: z.lazy(() => LocationTypeSchema).optional(),
    in: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => LocationTypeSchema)
      .array()
      .optional(),
    not: z.union([z.lazy(() => LocationTypeSchema), z.lazy(() => NestedEnumLocationTypeFilterObjectSchema)]).optional()
  })
  .strict()

export const NestedEnumLocationTypeFilterObjectSchema = Schema
