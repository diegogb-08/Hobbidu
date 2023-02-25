import { z } from 'zod'
import { LocationObjectEqualityInputObjectSchema } from './LocationObjectEqualityInput.schema'
import { LocationWhereInputObjectSchema } from './LocationWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationCompositeFilter> = z
  .object({
    equals: z.lazy(() => LocationObjectEqualityInputObjectSchema).optional(),
    is: z.lazy(() => LocationWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => LocationWhereInputObjectSchema).optional()
  })
  .strict()

export const LocationCompositeFilterObjectSchema = Schema
