import { z } from 'zod'
import { HobbyArgsObjectSchema } from './HobbyArgs.schema'
import { UserFindManySchema } from '../findManyUser.schema'
import { EventCountOutputTypeArgsObjectSchema } from './EventCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventInclude> = z
  .object({
    hobby: z.union([z.boolean(), z.lazy(() => HobbyArgsObjectSchema)]).optional(),
    users: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => EventCountOutputTypeArgsObjectSchema)]).optional()
  })
  .strict()

export const EventIncludeObjectSchema = Schema
