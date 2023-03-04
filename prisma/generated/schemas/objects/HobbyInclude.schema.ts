import { z } from 'zod'
import { UserFindManySchema } from '../findManyUser.schema'
import { EventFindManySchema } from '../findManyEvent.schema'
import { HobbyCountOutputTypeArgsObjectSchema } from './HobbyCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
    events: z.union([z.boolean(), z.lazy(() => EventFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => HobbyCountOutputTypeArgsObjectSchema)]).optional()
  })
  .strict()

export const HobbyIncludeObjectSchema = Schema
