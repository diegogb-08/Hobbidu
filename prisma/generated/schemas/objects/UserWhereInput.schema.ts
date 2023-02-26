import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema'
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { HobbyListRelationFilterObjectSchema } from './HobbyListRelationFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { LocationNullableCompositeFilterObjectSchema } from './LocationNullableCompositeFilter.schema'
import { LocationObjectEqualityInputObjectSchema } from './LocationObjectEqualityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => UserWhereInputObjectSchema), z.lazy(() => UserWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    bio: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    birth_date: z
      .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
      .optional()
      .nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    hobbies: z.lazy(() => HobbyListRelationFilterObjectSchema).optional(),
    hobbyIDs: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    location: z
      .union([
        z.lazy(() => LocationNullableCompositeFilterObjectSchema),
        z.lazy(() => LocationObjectEqualityInputObjectSchema)
      ])
      .optional()
      .nullable(),
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    password: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    phone_number: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    profile_img: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    user_name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
  })
  .strict()

export const UserWhereInputObjectSchema = Schema
