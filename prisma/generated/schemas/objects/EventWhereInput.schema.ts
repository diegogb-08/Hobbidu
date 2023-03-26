import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { LocationCompositeFilterObjectSchema } from './LocationCompositeFilter.schema'
import { LocationObjectEqualityInputObjectSchema } from './LocationObjectEqualityInput.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { HobbyRelationFilterObjectSchema } from './HobbyRelationFilter.schema'
import { HobbyWhereInputObjectSchema } from './HobbyWhereInput.schema'
import { UserListRelationFilterObjectSchema } from './UserListRelationFilter.schema'

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
    hobbyID: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    hostID: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    userIDs: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    location: z
      .union([z.lazy(() => LocationCompositeFilterObjectSchema), z.lazy(() => LocationObjectEqualityInputObjectSchema)])
      .optional(),
    maxUsers: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    hobby: z
      .union([z.lazy(() => HobbyRelationFilterObjectSchema), z.lazy(() => HobbyWhereInputObjectSchema)])
      .optional(),
    users: z.lazy(() => UserListRelationFilterObjectSchema).optional()
  })
  .strict()

export const EventWhereInputObjectSchema = Schema
