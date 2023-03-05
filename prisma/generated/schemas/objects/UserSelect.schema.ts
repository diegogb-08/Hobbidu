import { z } from 'zod'
import { HobbyFindManySchema } from '../findManyHobby.schema'
import { EventFindManySchema } from '../findManyEvent.schema'
import { UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    bio: z.boolean().optional(),
    birth_date: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    email: z.boolean().optional(),
    hobbies: z.union([z.boolean(), z.lazy(() => HobbyFindManySchema)]).optional(),
    hobbyIDs: z.boolean().optional(),
    events: z.union([z.boolean(), z.lazy(() => EventFindManySchema)]).optional(),
    eventIDs: z.boolean().optional(),
    location: z.boolean().optional(),
    name: z.boolean().optional(),
    password: z.boolean().optional(),
    phone_number: z.boolean().optional(),
    profile_img: z.boolean().optional(),
    user_name: z.boolean().optional(),
    role: z.boolean().optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
  })
  .strict()

export const UserSelectObjectSchema = Schema
