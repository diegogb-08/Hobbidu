import { z } from 'zod'
import { HobbyCreateWithoutEventsInputObjectSchema } from './HobbyCreateWithoutEventsInput.schema'
import { HobbyUncheckedCreateWithoutEventsInputObjectSchema } from './HobbyUncheckedCreateWithoutEventsInput.schema'
import { HobbyCreateOrConnectWithoutEventsInputObjectSchema } from './HobbyCreateOrConnectWithoutEventsInput.schema'
import { HobbyUpsertWithoutEventsInputObjectSchema } from './HobbyUpsertWithoutEventsInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'
import { HobbyUpdateWithoutEventsInputObjectSchema } from './HobbyUpdateWithoutEventsInput.schema'
import { HobbyUncheckedUpdateWithoutEventsInputObjectSchema } from './HobbyUncheckedUpdateWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUpdateOneRequiredWithoutEventsNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => HobbyCreateWithoutEventsInputObjectSchema),
        z.lazy(() => HobbyUncheckedCreateWithoutEventsInputObjectSchema)
      ])
      .optional(),
    connectOrCreate: z.lazy(() => HobbyCreateOrConnectWithoutEventsInputObjectSchema).optional(),
    upsert: z.lazy(() => HobbyUpsertWithoutEventsInputObjectSchema).optional(),
    connect: z.lazy(() => HobbyWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => HobbyUpdateWithoutEventsInputObjectSchema),
        z.lazy(() => HobbyUncheckedUpdateWithoutEventsInputObjectSchema)
      ])
      .optional()
  })
  .strict()

export const HobbyUpdateOneRequiredWithoutEventsNestedInputObjectSchema = Schema
