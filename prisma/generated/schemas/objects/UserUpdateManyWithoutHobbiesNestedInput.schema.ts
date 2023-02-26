import { z } from 'zod'
import { UserCreateWithoutHobbiesInputObjectSchema } from './UserCreateWithoutHobbiesInput.schema'
import { UserUncheckedCreateWithoutHobbiesInputObjectSchema } from './UserUncheckedCreateWithoutHobbiesInput.schema'
import { UserCreateOrConnectWithoutHobbiesInputObjectSchema } from './UserCreateOrConnectWithoutHobbiesInput.schema'
import { UserUpsertWithWhereUniqueWithoutHobbiesInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutHobbiesInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithWhereUniqueWithoutHobbiesInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutHobbiesInput.schema'
import { UserUpdateManyWithWhereWithoutHobbiesInputObjectSchema } from './UserUpdateManyWithWhereWithoutHobbiesInput.schema'
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateManyWithoutHobbiesNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutHobbiesInputObjectSchema),
        z.lazy(() => UserCreateWithoutHobbiesInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutHobbiesInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutHobbiesInputObjectSchema).array()
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutHobbiesInputObjectSchema),
        z.lazy(() => UserCreateOrConnectWithoutHobbiesInputObjectSchema).array()
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => UserUpsertWithWhereUniqueWithoutHobbiesInputObjectSchema),
        z.lazy(() => UserUpsertWithWhereUniqueWithoutHobbiesInputObjectSchema).array()
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
        z.lazy(() => UserUpdateWithWhereUniqueWithoutHobbiesInputObjectSchema),
        z.lazy(() => UserUpdateWithWhereUniqueWithoutHobbiesInputObjectSchema).array()
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => UserUpdateManyWithWhereWithoutHobbiesInputObjectSchema),
        z.lazy(() => UserUpdateManyWithWhereWithoutHobbiesInputObjectSchema).array()
      ])
      .optional(),
    deleteMany: z
      .union([z.lazy(() => UserScalarWhereInputObjectSchema), z.lazy(() => UserScalarWhereInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const UserUpdateManyWithoutHobbiesNestedInputObjectSchema = Schema
