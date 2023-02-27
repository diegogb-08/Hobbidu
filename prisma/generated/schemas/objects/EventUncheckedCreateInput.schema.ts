import { z } from 'zod'
import { UserUncheckedCreateNestedManyWithoutEventsInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutEventsInput.schema'
import { EventCreateuserIDsInputObjectSchema } from './EventCreateuserIDsInput.schema'
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
    hobbyID: z.string(),
    users: z.lazy(() => UserUncheckedCreateNestedManyWithoutEventsInputObjectSchema).optional(),
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

export const EventUncheckedCreateInputObjectSchema = Schema
