import { z } from 'zod'
import { EventCreatejoinersInputObjectSchema } from './EventCreatejoinersInput.schema'
import { LocationCreateEnvelopeInputObjectSchema } from './LocationCreateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    description: z.string(),
    event_date: z.date(),
    hobby_id: z.string(),
    joiners: z.union([z.lazy(() => EventCreatejoinersInputObjectSchema), z.string().array()]).optional(),
    location: z.union([
      z.lazy(() => LocationCreateEnvelopeInputObjectSchema),
      z.lazy(() => LocationCreateInputObjectSchema)
    ]),
    maxJoiners: z.number(),
    seats: z.string(),
    title: z.string(),
    user_id: z.string(),
    vehicle: z.boolean()
  })
  .strict()

export const EventUncheckedCreateInputObjectSchema = Schema
