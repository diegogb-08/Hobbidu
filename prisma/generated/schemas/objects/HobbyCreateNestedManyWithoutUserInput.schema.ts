import { z } from 'zod'
import { HobbyCreateWithoutUserInputObjectSchema } from './HobbyCreateWithoutUserInput.schema'
import { HobbyUncheckedCreateWithoutUserInputObjectSchema } from './HobbyUncheckedCreateWithoutUserInput.schema'
import { HobbyCreateOrConnectWithoutUserInputObjectSchema } from './HobbyCreateOrConnectWithoutUserInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => HobbyCreateWithoutUserInputObjectSchema),
        z.lazy(() => HobbyCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => HobbyUncheckedCreateWithoutUserInputObjectSchema),
        z.lazy(() => HobbyUncheckedCreateWithoutUserInputObjectSchema).array()
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => HobbyCreateOrConnectWithoutUserInputObjectSchema),
        z.lazy(() => HobbyCreateOrConnectWithoutUserInputObjectSchema).array()
      ])
      .optional(),
    connect: z
      .union([z.lazy(() => HobbyWhereUniqueInputObjectSchema), z.lazy(() => HobbyWhereUniqueInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const HobbyCreateNestedManyWithoutUserInputObjectSchema = Schema
