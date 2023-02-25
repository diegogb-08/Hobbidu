import { z } from 'zod'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'
import { LocationUpsertInputObjectSchema } from './LocationUpsertInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationNullableUpdateEnvelopeInput> = z
  .object({
    set: z
      .lazy(() => LocationCreateInputObjectSchema)
      .optional()
      .nullable(),
    upsert: z.lazy(() => LocationUpsertInputObjectSchema).optional(),
    unset: z.boolean().optional()
  })
  .strict()

export const LocationNullableUpdateEnvelopeInputObjectSchema = Schema
