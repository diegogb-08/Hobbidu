import { z } from 'zod'
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'
import { UserUpdateWithoutHobbiesInputObjectSchema } from './UserUpdateWithoutHobbiesInput.schema'
import { UserUncheckedUpdateWithoutHobbiesInputObjectSchema } from './UserUncheckedUpdateWithoutHobbiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutHobbiesInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => UserUpdateWithoutHobbiesInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutHobbiesInputObjectSchema)
    ])
  })
  .strict()

export const UserUpdateWithWhereUniqueWithoutHobbiesInputObjectSchema = Schema
