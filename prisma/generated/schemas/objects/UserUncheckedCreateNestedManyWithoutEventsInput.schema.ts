import { z } from 'zod'
import { UserCreateWithoutEventsInputObjectSchema } from './UserCreateWithoutEventsInput.schema'
import { UserUncheckedCreateWithoutEventsInputObjectSchema } from './UserUncheckedCreateWithoutEventsInput.schema'
import { UserCreateOrConnectWithoutEventsInputObjectSchema } from './UserCreateOrConnectWithoutEventsInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutEventsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutEventsInputObjectSchema),
        z.lazy(() => UserCreateWithoutEventsInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutEventsInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutEventsInputObjectSchema).array()
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutEventsInputObjectSchema),
        z.lazy(() => UserCreateOrConnectWithoutEventsInputObjectSchema).array()
      ])
      .optional(),
    connect: z
      .union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const UserUncheckedCreateNestedManyWithoutEventsInputObjectSchema = Schema
