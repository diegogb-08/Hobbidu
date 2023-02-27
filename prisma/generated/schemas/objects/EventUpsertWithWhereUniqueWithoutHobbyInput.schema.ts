import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutHobbyInputObjectSchema } from './EventUpdateWithoutHobbyInput.schema'
import { EventUncheckedUpdateWithoutHobbyInputObjectSchema } from './EventUncheckedUpdateWithoutHobbyInput.schema'
import { EventCreateWithoutHobbyInputObjectSchema } from './EventCreateWithoutHobbyInput.schema'
import { EventUncheckedCreateWithoutHobbyInputObjectSchema } from './EventUncheckedCreateWithoutHobbyInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutHobbyInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => EventUpdateWithoutHobbyInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutHobbyInputObjectSchema)
    ]),
    create: z.union([
      z.lazy(() => EventCreateWithoutHobbyInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutHobbyInputObjectSchema)
    ])
  })
  .strict()

export const EventUpsertWithWhereUniqueWithoutHobbyInputObjectSchema = Schema
