import { z } from 'zod'
import { HobbySelectObjectSchema } from './HobbySelect.schema'
import { HobbyIncludeObjectSchema } from './HobbyInclude.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyArgs> = z
  .object({
    select: z.lazy(() => HobbySelectObjectSchema).optional(),
    include: z.lazy(() => HobbyIncludeObjectSchema).optional()
  })
  .strict()

export const HobbyArgsObjectSchema = Schema
