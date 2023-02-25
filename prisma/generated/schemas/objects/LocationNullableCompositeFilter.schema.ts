import { z } from 'zod'
import { LocationObjectEqualityInputObjectSchema } from './LocationObjectEqualityInput.schema'
import { LocationWhereInputObjectSchema } from './LocationWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationNullableCompositeFilter> = z
  .object({
    equals: z
      .lazy(() => LocationObjectEqualityInputObjectSchema)
      .optional()
      .nullable(),
    is: z
      .lazy(() => LocationWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => LocationWhereInputObjectSchema)
      .optional()
      .nullable(),
    isSet: z.boolean().optional()
  })
  .strict()

export const LocationNullableCompositeFilterObjectSchema = Schema
