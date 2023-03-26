import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { UserUpdateManyWithoutHobbiesNestedInputObjectSchema } from './UserUpdateManyWithoutHobbiesNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUpdateWithoutEventsInput> = z
  .object({
    createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    user: z.lazy(() => UserUpdateManyWithoutHobbiesNestedInputObjectSchema).optional()
  })
  .strict()

export const HobbyUpdateWithoutEventsInputObjectSchema = Schema
