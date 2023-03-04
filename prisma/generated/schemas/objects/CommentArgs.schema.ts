import { z } from 'zod'
import { CommentSelectObjectSchema } from './CommentSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CommentArgs> = z
  .object({
    select: z.lazy(() => CommentSelectObjectSchema).optional()
  })
  .strict()

export const CommentArgsObjectSchema = Schema
