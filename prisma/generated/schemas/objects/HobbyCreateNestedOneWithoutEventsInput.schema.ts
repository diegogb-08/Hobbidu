import { z } from 'zod'
import { HobbyCreateWithoutEventsInputObjectSchema } from './HobbyCreateWithoutEventsInput.schema'
import { HobbyUncheckedCreateWithoutEventsInputObjectSchema } from './HobbyUncheckedCreateWithoutEventsInput.schema'
import { HobbyCreateOrConnectWithoutEventsInputObjectSchema } from './HobbyCreateOrConnectWithoutEventsInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateNestedOneWithoutEventsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => HobbyCreateWithoutEventsInputObjectSchema),
        z.lazy(() => HobbyUncheckedCreateWithoutEventsInputObjectSchema)
      ])
      .optional(),
    connectOrCreate: z.lazy(() => HobbyCreateOrConnectWithoutEventsInputObjectSchema).optional(),
    connect: z.lazy(() => HobbyWhereUniqueInputObjectSchema).optional()
  })
  .strict()

export const HobbyCreateNestedOneWithoutEventsInputObjectSchema = Schema
