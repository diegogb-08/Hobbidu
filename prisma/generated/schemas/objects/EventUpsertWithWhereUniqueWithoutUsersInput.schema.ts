import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithoutUsersInputObjectSchema } from './EventUpdateWithoutUsersInput.schema'
import { EventUncheckedUpdateWithoutUsersInputObjectSchema } from './EventUncheckedUpdateWithoutUsersInput.schema'
import { EventCreateWithoutUsersInputObjectSchema } from './EventCreateWithoutUsersInput.schema'
import { EventUncheckedCreateWithoutUsersInputObjectSchema } from './EventUncheckedCreateWithoutUsersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpsertWithWhereUniqueWithoutUsersInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => EventUpdateWithoutUsersInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateWithoutUsersInputObjectSchema)
    ]),
    create: z.union([
      z.lazy(() => EventCreateWithoutUsersInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutUsersInputObjectSchema)
    ])
  })
  .strict()

export const EventUpsertWithWhereUniqueWithoutUsersInputObjectSchema = Schema
