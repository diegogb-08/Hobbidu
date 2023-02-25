import { z } from 'zod'
import { LocationTypeSchema } from '../enums/LocationType.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EnumLocationTypeFieldUpdateOperationsInput> = z
  .object({
    set: z.lazy(() => LocationTypeSchema).optional()
  })
  .strict()

export const EnumLocationTypeFieldUpdateOperationsInputObjectSchema = Schema
