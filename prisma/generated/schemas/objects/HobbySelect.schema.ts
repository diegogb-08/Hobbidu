import { z } from 'zod'
import { UserFindManySchema } from '../findManyUser.schema'
import { EventFindManySchema } from '../findManyEvent.schema'
import { HobbyCountOutputTypeArgsObjectSchema } from './HobbyCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbySelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    name: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
    userIDs: z.boolean().optional(),
    events: z.union([z.boolean(), z.lazy(() => EventFindManySchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => HobbyCountOutputTypeArgsObjectSchema)]).optional()
  })
  .strict()

export const HobbySelectObjectSchema = Schema
