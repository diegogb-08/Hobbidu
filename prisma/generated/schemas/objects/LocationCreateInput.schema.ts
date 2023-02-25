import { z } from 'zod'
import { LocationCreatecoordinatesInputObjectSchema } from './LocationCreatecoordinatesInput.schema'
import { LocationTypeSchema } from '../enums/LocationType.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationCreateInput> = z
  .object({
    coordinates: z.union([z.lazy(() => LocationCreatecoordinatesInputObjectSchema), z.number().array()]).optional(),
    name: z.string(),
    type: z.lazy(() => LocationTypeSchema)
  })
  .strict()

export const LocationCreateInputObjectSchema = Schema
