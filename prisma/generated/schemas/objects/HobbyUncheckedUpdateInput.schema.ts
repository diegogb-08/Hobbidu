import { z } from 'zod'
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { UserUncheckedUpdateManyWithoutHobbiesNestedInputObjectSchema } from './UserUncheckedUpdateManyWithoutHobbiesNestedInput.schema'
import { HobbyUpdateuserIDsInputObjectSchema } from './HobbyUpdateuserIDsInput.schema'
import { EventUncheckedUpdateManyWithoutHobbyNestedInputObjectSchema } from './EventUncheckedUpdateManyWithoutHobbyNestedInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUncheckedUpdateInput> = z
  .object({
    createdAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    updatedAt: z.union([z.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    user: z.lazy(() => UserUncheckedUpdateManyWithoutHobbiesNestedInputObjectSchema).optional(),
    userIDs: z.union([z.lazy(() => HobbyUpdateuserIDsInputObjectSchema), z.string().array()]).optional(),
    events: z.lazy(() => EventUncheckedUpdateManyWithoutHobbyNestedInputObjectSchema).optional()
  })
  .strict()

export const HobbyUncheckedUpdateInputObjectSchema = Schema
