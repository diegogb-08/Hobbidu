import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutUsersInputObjectSchema } from './EventUpdateWithoutUsersInput.schema'
import { EventUncheckedUpdateWithoutUsersInputObjectSchema } from './EventUncheckedUpdateWithoutUsersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateWithWhereUniqueWithoutUsersInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => EventUpdateWithoutUsersInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutUsersInputObjectSchema)
    ])
  })
  .strict()

export const EventUpdateWithWhereUniqueWithoutUsersInputObjectSchema = Schema
