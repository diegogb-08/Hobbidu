import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FollowerMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    follower_id: z.literal(true).optional(),
    user_id: z.literal(true).optional()
  })
  .strict()

export const FollowerMaxAggregateInputObjectSchema = Schema
