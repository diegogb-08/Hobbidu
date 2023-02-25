import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema'
import { LocationCompositeFilterObjectSchema } from './LocationCompositeFilter.schema'
import { LocationObjectEqualityInputObjectSchema } from './LocationObjectEqualityInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => PostWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => PostWhereInputObjectSchema), z.lazy(() => PostWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    hobby_id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    image: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    like: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    location: z
      .union([z.lazy(() => LocationCompositeFilterObjectSchema), z.lazy(() => LocationObjectEqualityInputObjectSchema)])
      .optional(),
    user_id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
  })
  .strict()

export const PostWhereInputObjectSchema = Schema
