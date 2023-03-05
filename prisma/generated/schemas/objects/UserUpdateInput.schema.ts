import { z } from 'zod'
import { NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema'
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { HobbyUpdateManyWithoutUserNestedInputObjectSchema } from './HobbyUpdateManyWithoutUserNestedInput.schema'
import { UserUpdatehobbyIDsInputObjectSchema } from './UserUpdatehobbyIDsInput.schema'
import { EventUpdateManyWithoutUsersNestedInputObjectSchema } from './EventUpdateManyWithoutUsersNestedInput.schema'
import { UserUpdateeventIDsInputObjectSchema } from './UserUpdateeventIDsInput.schema'
import { LocationNullableUpdateEnvelopeInputObjectSchema } from './LocationNullableUpdateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    bio: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    birth_date: z
      .union([z.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    hobbies: z.lazy(() => HobbyUpdateManyWithoutUserNestedInputObjectSchema).optional(),
    hobbyIDs: z.union([z.lazy(() => UserUpdatehobbyIDsInputObjectSchema), z.string().array()]).optional(),
    events: z.lazy(() => EventUpdateManyWithoutUsersNestedInputObjectSchema).optional(),
    eventIDs: z.union([z.lazy(() => UserUpdateeventIDsInputObjectSchema), z.string().array()]).optional(),
    location: z
      .union([
        z.lazy(() => LocationNullableUpdateEnvelopeInputObjectSchema),
        z.lazy(() => LocationCreateInputObjectSchema)
      ])
      .optional()
      .nullable(),
    name: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    password: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    phone_number: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    profileImage: z
      .union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
      .optional()
      .nullable(),
    user_name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
  })
  .strict()

export const UserUpdateInputObjectSchema = Schema
