import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    description: z.literal(true).optional(),
    event_date: z.literal(true).optional(),
    hobby_id: z.literal(true).optional(),
    joiners: z.literal(true).optional(),
    maxJoiners: z.literal(true).optional(),
    seats: z.literal(true).optional(),
    title: z.literal(true).optional(),
    user_id: z.literal(true).optional(),
    vehicle: z.literal(true).optional(),
    _all: z.literal(true).optional()
  })
  .strict()

export const EventCountAggregateInputObjectSchema = Schema
