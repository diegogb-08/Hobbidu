import { z } from 'zod'
import { UserUncheckedCreateNestedManyWithoutHobbiesInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutHobbiesInput.schema'
import { HobbyCreateuserIDsInputObjectSchema } from './HobbyCreateuserIDsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUncheckedCreateWithoutEventsInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    user: z.lazy(() => UserUncheckedCreateNestedManyWithoutHobbiesInputObjectSchema).optional(),
    userIDs: z.union([z.lazy(() => HobbyCreateuserIDsInputObjectSchema), z.string().array()]).optional()
  })
  .strict()

export const HobbyUncheckedCreateWithoutEventsInputObjectSchema = Schema
