import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    name: z.literal(true).optional(),
    user_id: z.literal(true).optional(),
    _all: z.literal(true).optional()
  })
  .strict()

export const HobbyCountAggregateInputObjectSchema = Schema
