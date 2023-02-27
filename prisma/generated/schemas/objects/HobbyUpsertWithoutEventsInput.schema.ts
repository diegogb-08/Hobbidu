import { z } from 'zod'
import { HobbyUpdateWithoutEventsInputObjectSchema } from './HobbyUpdateWithoutEventsInput.schema'
import { HobbyUncheckedUpdateWithoutEventsInputObjectSchema } from './HobbyUncheckedUpdateWithoutEventsInput.schema'
import { HobbyCreateWithoutEventsInputObjectSchema } from './HobbyCreateWithoutEventsInput.schema'
import { HobbyUncheckedCreateWithoutEventsInputObjectSchema } from './HobbyUncheckedCreateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUpsertWithoutEventsInput> = z
  .object({
    update: z.union([
      z.lazy(() => HobbyUpdateWithoutEventsInputObjectSchema),
      z.lazy(() => HobbyUncheckedUpdateWithoutEventsInputObjectSchema)
    ]),
    create: z.union([
      z.lazy(() => HobbyCreateWithoutEventsInputObjectSchema),
      z.lazy(() => HobbyUncheckedCreateWithoutEventsInputObjectSchema)
    ])
  })
  .strict()

export const HobbyUpsertWithoutEventsInputObjectSchema = Schema
