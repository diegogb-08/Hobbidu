import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    description: z.literal(true).optional(),
    hobby_id: z.literal(true).optional(),
    image: z.literal(true).optional(),
    like: z.literal(true).optional(),
    user_id: z.literal(true).optional(),
    _all: z.literal(true).optional()
  })
  .strict()

export const PostCountAggregateInputObjectSchema = Schema
