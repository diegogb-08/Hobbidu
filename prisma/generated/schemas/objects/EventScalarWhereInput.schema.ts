import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventScalarWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => EventScalarWhereInputObjectSchema), z.lazy(() => EventScalarWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => EventScalarWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => EventScalarWhereInputObjectSchema), z.lazy(() => EventScalarWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    event_date: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    hobbyID: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    hostID: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userIDs: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    maxUsers: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
  })
  .strict()

export const EventScalarWhereInputObjectSchema = Schema
