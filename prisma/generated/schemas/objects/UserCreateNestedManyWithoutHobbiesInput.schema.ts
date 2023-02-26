import { z } from 'zod'
import { UserCreateWithoutHobbiesInputObjectSchema } from './UserCreateWithoutHobbiesInput.schema'
import { UserUncheckedCreateWithoutHobbiesInputObjectSchema } from './UserUncheckedCreateWithoutHobbiesInput.schema'
import { UserCreateOrConnectWithoutHobbiesInputObjectSchema } from './UserCreateOrConnectWithoutHobbiesInput.schema'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateNestedManyWithoutHobbiesInput> = z
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
    connect: z
      .union([z.lazy(() => UserWhereUniqueInputObjectSchema), z.lazy(() => UserWhereUniqueInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const UserCreateNestedManyWithoutHobbiesInputObjectSchema = Schema
