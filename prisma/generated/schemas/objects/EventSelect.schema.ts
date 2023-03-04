import { z } from 'zod'
import { HobbyArgsObjectSchema } from './HobbyArgs.schema'
import { UserFindManySchema } from '../findManyUser.schema'
import { EventCountOutputTypeArgsObjectSchema } from './EventCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    description: z.boolean().optional(),
    event_date: z.boolean().optional(),
    hobby: z.union([z.boolean(), z.lazy(() => HobbyArgsObjectSchema)]).optional(),
    hobbyID: z.boolean().optional(),
    users: z.union([z.boolean(), z.lazy(() => UserFindManySchema)]).optional(),
    hostID: z.boolean().optional(),
    userIDs: z.boolean().optional(),
    location: z.boolean().optional(),
    maxUsers: z.boolean().optional(),
    title: z.boolean().optional(),
    _count: z.union([z.boolean(), z.lazy(() => EventCountOutputTypeArgsObjectSchema)]).optional()
  })
  .strict()

export const EventSelectObjectSchema = Schema
