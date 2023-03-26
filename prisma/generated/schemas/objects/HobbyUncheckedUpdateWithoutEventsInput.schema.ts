import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { HobbyUpdateuserIDsInputObjectSchema } from './HobbyUpdateuserIDsInput.schema'
import { UserUncheckedUpdateManyWithoutHobbiesNestedInputObjectSchema } from './UserUncheckedUpdateManyWithoutHobbiesNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUncheckedUpdateWithoutEventsInput> = z
  .object({
    createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    userIDs: z.union([z.lazy(() => HobbyUpdateuserIDsInputObjectSchema), z.string().array()]).optional(),
    user: z.lazy(() => UserUncheckedUpdateManyWithoutHobbiesNestedInputObjectSchema).optional()
  })
  .strict()

export const HobbyUncheckedUpdateWithoutEventsInputObjectSchema = Schema
