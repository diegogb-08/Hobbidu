import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CommentSelect> = z
  .object({
    id: z.boolean().optional(),
    content: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    event_id: z.boolean().optional(),
    post_id: z.boolean().optional(),
    user_id: z.boolean().optional()
  })
  .strict()

export const CommentSelectObjectSchema = Schema
