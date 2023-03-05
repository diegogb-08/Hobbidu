import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    bio: z.literal(true).optional(),
    birth_date: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    email: z.literal(true).optional(),
    hobbyIDs: z.literal(true).optional(),
    eventIDs: z.literal(true).optional(),
    name: z.literal(true).optional(),
    password: z.literal(true).optional(),
    phone_number: z.literal(true).optional(),
    profile_img: z.literal(true).optional(),
    user_name: z.literal(true).optional(),
    role: z.literal(true).optional(),
    _all: z.literal(true).optional()
  })
  .strict()

export const UserCountAggregateInputObjectSchema = Schema
