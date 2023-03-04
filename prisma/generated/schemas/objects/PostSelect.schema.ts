import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    description: z.boolean().optional(),
    hobby_id: z.boolean().optional(),
    image: z.boolean().optional(),
    like: z.boolean().optional(),
    location: z.boolean().optional(),
    user_id: z.boolean().optional()
  })
  .strict()

export const PostSelectObjectSchema = Schema
