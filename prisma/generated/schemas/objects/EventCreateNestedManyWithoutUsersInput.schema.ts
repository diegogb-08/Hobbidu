import { z } from 'zod'
import { EventCreateWithoutUsersInputObjectSchema } from './EventCreateWithoutUsersInput.schema'
import { EventUncheckedCreateWithoutUsersInputObjectSchema } from './EventUncheckedCreateWithoutUsersInput.schema'
import { EventCreateOrConnectWithoutUsersInputObjectSchema } from './EventCreateOrConnectWithoutUsersInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateNestedManyWithoutUsersInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutUsersInputObjectSchema),
        z.lazy(() => EventCreateWithoutUsersInputObjectSchema).array(),
        z.lazy(() => EventUncheckedCreateWithoutUsersInputObjectSchema),
        z.lazy(() => EventUncheckedCreateWithoutUsersInputObjectSchema).array()
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EventCreateOrConnectWithoutUsersInputObjectSchema),
        z.lazy(() => EventCreateOrConnectWithoutUsersInputObjectSchema).array()
      ])
      .optional(),
    connect: z
      .union([z.lazy(() => EventWhereUniqueInputObjectSchema), z.lazy(() => EventWhereUniqueInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const EventCreateNestedManyWithoutUsersInputObjectSchema = Schema
