import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutHobbyInputObjectSchema } from './EventCreateWithoutHobbyInput.schema'
import { EventUncheckedCreateWithoutHobbyInputObjectSchema } from './EventUncheckedCreateWithoutHobbyInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutHobbyInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutHobbyInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutHobbyInputObjectSchema)
    ])
  })
  .strict()

export const EventCreateOrConnectWithoutHobbyInputObjectSchema = Schema
