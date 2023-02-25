import { z } from 'zod'
import { LocationUpdatecoordinatesInputObjectSchema } from './LocationUpdatecoordinatesInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { LocationTypeSchema } from '../enums/LocationType.schema'
import { EnumLocationTypeFieldUpdateOperationsInputObjectSchema } from './EnumLocationTypeFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationUpdateInput> = z
  .object({
    coordinates: z.union([z.lazy(() => LocationUpdatecoordinatesInputObjectSchema), z.number().array()]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    type: z
      .union([z.lazy(() => LocationTypeSchema), z.lazy(() => EnumLocationTypeFieldUpdateOperationsInputObjectSchema)])
      .optional()
  })
  .strict()

export const LocationUpdateInputObjectSchema = Schema
