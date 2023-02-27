import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    description: z.literal(true).optional(),
    event_date: z.literal(true).optional(),
    hobbyID: z.literal(true).optional(),
    hostID: z.literal(true).optional(),
    userIDs: z.literal(true).optional(),
    maxUsers: z.literal(true).optional(),
    title: z.literal(true).optional(),
    _all: z.literal(true).optional()
  })
  .strict()

export const EventCountAggregateInputObjectSchema = Schema
