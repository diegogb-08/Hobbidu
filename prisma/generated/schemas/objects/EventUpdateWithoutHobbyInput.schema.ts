import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { LocationUpdateEnvelopeInputObjectSchema } from './LocationUpdateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { UserUpdateManyWithoutEventsNestedInputObjectSchema } from './UserUpdateManyWithoutEventsNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithoutHobbyInput> = z
  .object({
    createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    event_date: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    hostID: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    location: z
      .union([z.lazy(() => LocationUpdateEnvelopeInputObjectSchema), z.lazy(() => LocationCreateInputObjectSchema)])
      .optional(),
    maxUsers: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    users: z.lazy(() => UserUpdateManyWithoutEventsNestedInputObjectSchema).optional()
  })
  .strict()

export const EventUpdateWithoutHobbyInputObjectSchema = Schema
