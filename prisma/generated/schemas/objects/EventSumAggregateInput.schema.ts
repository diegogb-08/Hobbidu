import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventSumAggregateInputType> = z
  .object({
    maxUsers: z.literal(true).optional()
  })
  .strict()

export const EventSumAggregateInputObjectSchema = Schema
