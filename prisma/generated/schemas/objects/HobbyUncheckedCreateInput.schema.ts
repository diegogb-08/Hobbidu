import { z } from 'zod'
import { HobbyCreateuserIDsInputObjectSchema } from './HobbyCreateuserIDsInput.schema'
import { UserUncheckedCreateNestedManyWithoutHobbiesInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutHobbiesInput.schema'
import { EventUncheckedCreateNestedManyWithoutHobbyInputObjectSchema } from './EventUncheckedCreateNestedManyWithoutHobbyInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    name: z.string(),
    userIDs: z.union([z.lazy(() => HobbyCreateuserIDsInputObjectSchema), z.string().array()]).optional(),
    user: z.lazy(() => UserUncheckedCreateNestedManyWithoutHobbiesInputObjectSchema).optional(),
    events: z.lazy(() => EventUncheckedCreateNestedManyWithoutHobbyInputObjectSchema).optional()
  })
  .strict()

export const HobbyUncheckedCreateInputObjectSchema = Schema
