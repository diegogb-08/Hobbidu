import { z } from 'zod'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationCreateEnvelopeInput> = z
  .object({
    set: z.lazy(() => LocationCreateInputObjectSchema).optional()
  })
  .strict()

export const LocationCreateEnvelopeInputObjectSchema = Schema
