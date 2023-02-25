import { z } from 'zod'
import { LocationTypeSchema } from '../enums/LocationType.schema'
import { NestedEnumLocationTypeFilterObjectSchema } from './NestedEnumLocationTypeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EnumLocationTypeFilter> = z
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

export const EnumLocationTypeFilterObjectSchema = Schema
