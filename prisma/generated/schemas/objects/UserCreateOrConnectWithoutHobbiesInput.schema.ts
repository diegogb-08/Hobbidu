import { z } from 'zod'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserCreateWithoutHobbiesInputObjectSchema } from './UserCreateWithoutHobbiesInput.schema'
import { UserUncheckedCreateWithoutHobbiesInputObjectSchema } from './UserUncheckedCreateWithoutHobbiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutHobbiesInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutHobbiesInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutHobbiesInputObjectSchema)
    ])
  })
  .strict()

export const UserCreateOrConnectWithoutHobbiesInputObjectSchema = Schema
