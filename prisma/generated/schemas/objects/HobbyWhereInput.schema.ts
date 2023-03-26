import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema'
import { EventListRelationFilterObjectSchema } from './EventListRelationFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => HobbyWhereInputObjectSchema), z.lazy(() => HobbyWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => HobbyWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => HobbyWhereInputObjectSchema), z.lazy(() => HobbyWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userIDs: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    user: z.lazy(() => UserListRelationFilterObjectSchema).optional(),
    events: z.lazy(() => EventListRelationFilterObjectSchema).optional()
  })
  .strict()

export const HobbyWhereInputObjectSchema = Schema
