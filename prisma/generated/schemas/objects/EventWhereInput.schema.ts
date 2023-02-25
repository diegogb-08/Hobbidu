import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { LocationCompositeFilterObjectSchema } from './LocationCompositeFilter.schema'
import { LocationObjectEqualityInputObjectSchema } from './LocationObjectEqualityInput.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { BoolFilterObjectSchema } from './BoolFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => EventWhereInputObjectSchema), z.lazy(() => EventWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => EventWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => EventWhereInputObjectSchema), z.lazy(() => EventWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    event_date: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    hobby_id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    joiners: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    location: z
      .union([z.lazy(() => LocationCompositeFilterObjectSchema), z.lazy(() => LocationObjectEqualityInputObjectSchema)])
      .optional(),
    maxJoiners: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    seats: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    user_id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    vehicle: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional()
  })
  .strict()

export const EventWhereInputObjectSchema = Schema
