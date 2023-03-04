import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCountOutputTypeSelect> = z
  .object({
    users: z.boolean().optional()
  })
  .strict()

export const EventCountOutputTypeSelectObjectSchema = Schema
