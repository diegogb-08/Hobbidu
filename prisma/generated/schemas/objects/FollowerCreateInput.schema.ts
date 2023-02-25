import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FollowerCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    follower_id: z.string(),
    user_id: z.string()
  })
  .strict()

export const FollowerCreateInputObjectSchema = Schema
