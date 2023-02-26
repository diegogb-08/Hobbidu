import { z } from 'zod'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'
import { HobbyCreateWithoutUserInputObjectSchema } from './HobbyCreateWithoutUserInput.schema'
import { HobbyUncheckedCreateWithoutUserInputObjectSchema } from './HobbyUncheckedCreateWithoutUserInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => HobbyWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => HobbyCreateWithoutUserInputObjectSchema),
      z.lazy(() => HobbyUncheckedCreateWithoutUserInputObjectSchema)
    ])
  })
  .strict()

export const HobbyCreateOrConnectWithoutUserInputObjectSchema = Schema
