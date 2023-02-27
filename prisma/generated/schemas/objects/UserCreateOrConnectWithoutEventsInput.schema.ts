import { z } from 'zod'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutEventsInputObjectSchema } from './UserCreateWithoutEventsInput.schema'
import { UserUncheckedCreateWithoutEventsInputObjectSchema } from './UserUncheckedCreateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutEventsInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutEventsInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutEventsInputObjectSchema)
    ])
  })
  .strict()

export const UserCreateOrConnectWithoutEventsInputObjectSchema = Schema
