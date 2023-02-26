import { z } from 'zod'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'
import { HobbyUpdateWithoutUserInputObjectSchema } from './HobbyUpdateWithoutUserInput.schema'
import { HobbyUncheckedUpdateWithoutUserInputObjectSchema } from './HobbyUncheckedUpdateWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => HobbyWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => HobbyUpdateWithoutUserInputObjectSchema),
      z.lazy(() => HobbyUncheckedUpdateWithoutUserInputObjectSchema)
    ])
  })
  .strict()

export const HobbyUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema
