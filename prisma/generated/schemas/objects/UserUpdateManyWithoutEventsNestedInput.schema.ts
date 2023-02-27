import { z } from 'zod'
import { UserCreateWithoutEventsInputObjectSchema } from './UserCreateWithoutEventsInput.schema'
import { UserUncheckedCreateWithoutEventsInputObjectSchema } from './UserUncheckedCreateWithoutEventsInput.schema'
import { UserCreateOrConnectWithoutEventsInputObjectSchema } from './UserCreateOrConnectWithoutEventsInput.schema'
import { UserUpsertWithWhereUniqueWithoutEventsInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutEventsInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithWhereUniqueWithoutEventsInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutEventsInput.schema'
import { UserUpdateManyWithWhereWithoutEventsInputObjectSchema } from './UserUpdateManyWithWhereWithoutEventsInput.schema'
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateManyWithoutEventsNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => UserUpsertWithWhereUniqueWithoutEventsInputObjectSchema),
        z.lazy(() => UserUpsertWithWhereUniqueWithoutEventsInputObjectSchema).array()
      ])
      .optional(),
    set: z
      .union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()])
      .optional(),
    disconnect: z
      .union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()])
      .optional(),
    delete: z
      .union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()])
      .optional(),
    connect: z
      .union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()])
      .optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithWhereUniqueWithoutEventsInputObjectSchema),
        z.lazy(() => UserUpdateWithWhereUniqueWithoutEventsInputObjectSchema).array()
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserUpdateManyWithWhereWithoutEventsInputObjectSchema),
        z.lazy(() => UserUpdateManyWithWhereWithoutEventsInputObjectSchema).array()
      ])
      .optional(),
    deleteMany: z
      .union([z.lazy(() => UserScalarWhereInputObjectSchema), z.lazy(() => UserScalarWhereInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const UserUpdateManyWithoutEventsNestedInputObjectSchema = Schema
