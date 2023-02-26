import { z } from 'zod'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'
import { HobbyUpdateWithoutUserInputObjectSchema } from './HobbyUpdateWithoutUserInput.schema'
import { HobbyUncheckedUpdateWithoutUserInputObjectSchema } from './HobbyUncheckedUpdateWithoutUserInput.schema'
import { HobbyCreateWithoutUserInputObjectSchema } from './HobbyCreateWithoutUserInput.schema'
import { HobbyUncheckedCreateWithoutUserInputObjectSchema } from './HobbyUncheckedCreateWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => HobbyWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => HobbyUpdateWithoutUserInputObjectSchema),
      z.lazy(() => HobbyUncheckedUpdateWithoutUserInputObjectSchema)
    ]),
    create: z.union([
      z.lazy(() => HobbyCreateWithoutUserInputObjectSchema),
      z.lazy(() => HobbyUncheckedCreateWithoutUserInputObjectSchema)
    ])
  })
  .strict()

export const HobbyUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema
