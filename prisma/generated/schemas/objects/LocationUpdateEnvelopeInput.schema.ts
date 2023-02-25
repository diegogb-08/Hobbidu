import { z } from 'zod'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'
import { LocationUpdateInputObjectSchema } from './LocationUpdateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationUpdateEnvelopeInput> = z
  .object({
    set: z.lazy(() => LocationCreateInputObjectSchema).optional(),
    update: z.lazy(() => LocationUpdateInputObjectSchema).optional()
  })
  .strict()

export const LocationUpdateEnvelopeInputObjectSchema = Schema
