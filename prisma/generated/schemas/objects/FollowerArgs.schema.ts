import { z } from 'zod'
import { FollowerSelectObjectSchema } from './FollowerSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FollowerArgs> = z
  .object({
    select: z.lazy(() => FollowerSelectObjectSchema).optional()
  })
  .strict()

export const FollowerArgsObjectSchema = Schema
