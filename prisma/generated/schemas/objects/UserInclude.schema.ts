import { z } from 'zod'
import { HobbyFindManySchema } from '../findManyHobby.schema'
import { EventFindManySchema } from '../findManyEvent.schema'
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserInclude> = z
  .object({
    hobbies: z.union([z.boolean(), z.lazy(() => HobbyFindManySchema)]).optional(),
    events: z.union([z.boolean(), z.lazy(() => EventFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
  })
  .strict()

export const UserIncludeObjectSchema = Schema
