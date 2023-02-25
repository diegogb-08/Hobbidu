import { z } from 'zod'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'
import { LocationUpdateInputObjectSchema } from './LocationUpdateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationUpsertInput> = z
  .object({
    set: z.lazy(() => LocationCreateInputObjectSchema).nullable(),
    update: z.lazy(() => LocationUpdateInputObjectSchema)
  })
  .strict()

export const LocationUpsertInputObjectSchema = Schema
