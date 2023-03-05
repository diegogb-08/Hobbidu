import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    mimeType: z.literal(true).optional(),
    size: z.literal(true).optional(),
    data: z.literal(true).optional(),
    _all: z.literal(true).optional()
  })
  .strict()

export const FileCountAggregateInputObjectSchema = Schema
