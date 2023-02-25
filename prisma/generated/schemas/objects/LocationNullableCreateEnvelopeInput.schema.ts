import { z } from 'zod'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationNullableCreateEnvelopeInput> = z
  .object({
    set: z
      .lazy(() => LocationCreateInputObjectSchema)
      .optional()
      .nullable()
  })
  .strict()

export const LocationNullableCreateEnvelopeInputObjectSchema = Schema
