import { z } from 'zod'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => EventScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => EventScalarWhereWithAggregatesInputObjectSchema).array()
      ])
      .optional(),
    OR: z
      .lazy(() => EventScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EventScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => EventScalarWhereWithAggregatesInputObjectSchema).array()
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
    description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    event_date: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
    hobbyID: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    hostID: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    userIDs: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    maxUsers: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
  })
  .strict()

export const EventScalarWhereWithAggregatesInputObjectSchema = Schema
