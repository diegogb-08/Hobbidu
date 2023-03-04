import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FollowerSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    follower_id: z.boolean().optional(),
    user_id: z.boolean().optional()
  })
  .strict()

export const FollowerSelectObjectSchema = Schema
