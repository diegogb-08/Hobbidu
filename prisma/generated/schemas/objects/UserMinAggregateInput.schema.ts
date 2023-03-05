import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserMinAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    bio: z.literal(true).optional(),
    birth_date: z.literal(true).optional(),
    createdAt: z.literal(true).optional(),
    updatedAt: z.literal(true).optional(),
    email: z.literal(true).optional(),
    name: z.literal(true).optional(),
    password: z.literal(true).optional(),
    phone_number: z.literal(true).optional(),
    profileImage: z.literal(true).optional(),
    user_name: z.literal(true).optional()
  })
  .strict()

export const UserMinAggregateInputObjectSchema = Schema
