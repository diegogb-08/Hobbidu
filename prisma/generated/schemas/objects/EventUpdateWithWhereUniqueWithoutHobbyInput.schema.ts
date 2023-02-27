import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutHobbyInputObjectSchema } from './EventUpdateWithoutHobbyInput.schema'
import { EventUncheckedUpdateWithoutHobbyInputObjectSchema } from './EventUncheckedUpdateWithoutHobbyInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutHobbyInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => EventUpdateWithoutHobbyInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutHobbyInputObjectSchema)
    ])
  })
  .strict()

export const EventUpdateWithWhereUniqueWithoutHobbyInputObjectSchema = Schema
