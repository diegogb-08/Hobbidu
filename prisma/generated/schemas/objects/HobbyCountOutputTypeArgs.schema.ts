import { z } from 'zod'
import { HobbyCountOutputTypeSelectObjectSchema } from './HobbyCountOutputTypeSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCountOutputTypeArgs> = z
  .object({
    select: z.lazy(() => HobbyCountOutputTypeSelectObjectSchema).optional()
  })
  .strict()

export const HobbyCountOutputTypeArgsObjectSchema = Schema
