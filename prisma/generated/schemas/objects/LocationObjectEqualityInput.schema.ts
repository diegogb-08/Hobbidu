import { z } from 'zod'
import { LocationTypeSchema } from '../enums/LocationType.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationObjectEqualityInput> = z
  .object({
    coordinates: z.number().array().optional(),
    name: z.string(),
    type: z.lazy(() => LocationTypeSchema)
  })
  .strict()

export const LocationObjectEqualityInputObjectSchema = Schema
