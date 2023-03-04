import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCountOutputTypeSelect> = z
  .object({
    user: z.boolean().optional(),
    events: z.boolean().optional()
  })
  .strict()

export const HobbyCountOutputTypeSelectObjectSchema = Schema
