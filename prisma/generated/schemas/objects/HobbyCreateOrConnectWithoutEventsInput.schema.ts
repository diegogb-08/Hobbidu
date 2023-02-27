import { z } from 'zod'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'
import { HobbyCreateWithoutEventsInputObjectSchema } from './HobbyCreateWithoutEventsInput.schema'
import { HobbyUncheckedCreateWithoutEventsInputObjectSchema } from './HobbyUncheckedCreateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyCreateOrConnectWithoutEventsInput> = z
  .object({
    where: z.lazy(() => HobbyWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => HobbyCreateWithoutEventsInputObjectSchema),
      z.lazy(() => HobbyUncheckedCreateWithoutEventsInputObjectSchema)
    ])
  })
  .strict()

export const HobbyCreateOrConnectWithoutEventsInputObjectSchema = Schema
