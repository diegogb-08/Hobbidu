import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateeventIDsInput> = z
  .object({
    set: z.string().array().optional(),
    push: z.union([z.string(), z.string().array()]).optional()
  })
  .strict()

export const UserUpdateeventIDsInputObjectSchema = Schema
