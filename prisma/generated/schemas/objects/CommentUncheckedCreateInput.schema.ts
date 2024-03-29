import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CommentUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    content: z.string().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    event_id: z.string().optional().nullable(),
    post_id: z.string().optional().nullable(),
    user_id: z.string()
  })
  .strict()

export const CommentUncheckedCreateInputObjectSchema = Schema
