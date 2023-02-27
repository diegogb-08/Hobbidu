import { z } from 'zod'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithoutEventsInputObjectSchema } from './UserUpdateWithoutEventsInput.schema'
import { UserUncheckedUpdateWithoutEventsInputObjectSchema } from './UserUncheckedUpdateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutEventsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserUpdateWithoutEventsInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutEventsInputObjectSchema)
    ])
  })
  .strict()

export const UserUpdateWithWhereUniqueWithoutEventsInputObjectSchema = Schema
