import { z } from 'zod'
import { FloatNullableListFilterObjectSchema } from './FloatNullableListFilter.schema'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { EnumLocationTypeFilterObjectSchema } from './EnumLocationTypeFilter.schema'
import { LocationTypeSchema } from '../enums/LocationType.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.LocationWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => LocationWhereInputObjectSchema), z.lazy(() => LocationWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => LocationWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => LocationWhereInputObjectSchema), z.lazy(() => LocationWhereInputObjectSchema).array()])
      .optional(),
    coordinates: z.lazy(() => FloatNullableListFilterObjectSchema).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    type: z.union([z.lazy(() => EnumLocationTypeFilterObjectSchema), z.lazy(() => LocationTypeSchema)]).optional()
  })
  .strict()

export const LocationWhereInputObjectSchema = Schema
