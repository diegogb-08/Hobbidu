import { z } from 'zod'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithoutHobbiesInputObjectSchema } from './UserUpdateWithoutHobbiesInput.schema'
import { UserUncheckedUpdateWithoutHobbiesInputObjectSchema } from './UserUncheckedUpdateWithoutHobbiesInput.schema'
import { UserCreateWithoutHobbiesInputObjectSchema } from './UserCreateWithoutHobbiesInput.schema'
import { UserUncheckedCreateWithoutHobbiesInputObjectSchema } from './UserUncheckedCreateWithoutHobbiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutHobbiesInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => UserUpdateWithoutHobbiesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutHobbiesInputObjectSchema)
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutHobbiesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutHobbiesInputObjectSchema)
    ])
  })
  .strict()

export const UserUpsertWithWhereUniqueWithoutHobbiesInputObjectSchema = Schema
