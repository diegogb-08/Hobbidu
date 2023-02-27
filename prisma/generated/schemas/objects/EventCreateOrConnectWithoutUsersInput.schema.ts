import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventCreateWithoutUsersInputObjectSchema } from './EventCreateWithoutUsersInput.schema'
import { EventUncheckedCreateWithoutUsersInputObjectSchema } from './EventUncheckedCreateWithoutUsersInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateOrConnectWithoutUsersInput> = z
  .object({
    where: z.lazy(() => EventWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EventCreateWithoutUsersInputObjectSchema),
      z.lazy(() => EventUncheckedCreateWithoutUsersInputObjectSchema)
    ])
  })
  .strict()

export const EventCreateOrConnectWithoutUsersInputObjectSchema = Schema
