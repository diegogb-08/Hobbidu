import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { UserUpdateManyWithoutHobbiesNestedInputObjectSchema } from './UserUpdateManyWithoutHobbiesNestedInput.schema'
import { EventUpdateManyWithoutHobbyNestedInputObjectSchema } from './EventUpdateManyWithoutHobbyNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUpdateInput> = z
  .object({
    createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    user: z.lazy(() => UserUpdateManyWithoutHobbiesNestedInputObjectSchema).optional(),
    events: z.lazy(() => EventUpdateManyWithoutHobbyNestedInputObjectSchema).optional()
  })
  .strict()

export const HobbyUpdateInputObjectSchema = Schema
