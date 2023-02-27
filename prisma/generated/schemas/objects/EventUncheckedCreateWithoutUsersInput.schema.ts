import { z } from 'zod'
import { EventCreateuserIDsInputObjectSchema } from './EventCreateuserIDsInput.schema'
import { LocationCreateEnvelopeInputObjectSchema } from './LocationCreateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedCreateWithoutUsersInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    description: z.string(),
    event_date: z.date(),
    hobbyID: z.string(),
    hostID: z.string(),
    userIDs: z.union([z.lazy(() => EventCreateuserIDsInputObjectSchema), z.string().array()]).optional(),
    location: z.union([
      z.lazy(() => LocationCreateEnvelopeInputObjectSchema),
      z.lazy(() => LocationCreateInputObjectSchema)
    ]),
    maxUsers: z.number(),
    title: z.string()
  })
  .strict()

export const EventUncheckedCreateWithoutUsersInputObjectSchema = Schema
