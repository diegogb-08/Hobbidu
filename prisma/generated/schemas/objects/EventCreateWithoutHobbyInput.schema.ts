import { z } from 'zod'
import { LocationCreateEnvelopeInputObjectSchema } from './LocationCreateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'
import { UserCreateNestedManyWithoutEventsInputObjectSchema } from './UserCreateNestedManyWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateWithoutHobbyInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    description: z.string(),
    event_date: z.date(),
    hostID: z.string(),
    location: z.union([
      z.lazy(() => LocationCreateEnvelopeInputObjectSchema),
      z.lazy(() => LocationCreateInputObjectSchema)
    ]),
    maxUsers: z.number(),
    title: z.string(),
    users: z.lazy(() => UserCreateNestedManyWithoutEventsInputObjectSchema).optional()
  })
  .strict()

export const EventCreateWithoutHobbyInputObjectSchema = Schema
