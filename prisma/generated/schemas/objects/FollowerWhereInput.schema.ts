import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FollowerWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => FollowerWhereInputObjectSchema), z.lazy(() => FollowerWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => FollowerWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => FollowerWhereInputObjectSchema), z.lazy(() => FollowerWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
    follower_id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    user_id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
  })
  .strict()

export const FollowerWhereInputObjectSchema = Schema
