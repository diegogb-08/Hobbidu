import { z } from 'zod'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => HobbyScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => HobbyScalarWhereWithAggregatesInputObjectSchema).array()
      ])
      .optional(),
    OR: z
      .lazy(() => HobbyScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => HobbyScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => HobbyScalarWhereWithAggregatesInputObjectSchema).array()
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    userIDs: z.lazy(() => StringNullableListFilterObjectSchema).optional()
  })
  .strict()

export const HobbyScalarWhereWithAggregatesInputObjectSchema = Schema
