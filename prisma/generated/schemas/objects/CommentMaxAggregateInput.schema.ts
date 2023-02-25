import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CommentMaxAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    content: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    event_id: z.literal(true).optional(),
    post_id: z.literal(true).optional(),
    user_id: z.literal(true).optional()
  })
  .strict()

export const CommentMaxAggregateInputObjectSchema = Schema
