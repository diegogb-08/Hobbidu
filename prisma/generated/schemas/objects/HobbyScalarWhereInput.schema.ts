import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyScalarWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => HobbyScalarWhereInputObjectSchema), z.lazy(() => HobbyScalarWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => HobbyScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => HobbyScalarWhereInputObjectSchema), z.lazy(() => HobbyScalarWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userIDs: z.lazy(() => StringNullableListFilterObjectSchema).optional()
  })
  .strict()

export const HobbyScalarWhereInputObjectSchema = Schema
