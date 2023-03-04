import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
  .object({
    hobbies: z.boolean().optional(),
    events: z.boolean().optional()
  })
  .strict()

export const UserCountOutputTypeSelectObjectSchema = Schema
