import { z } from 'zod'
import { EventCreateWithoutUsersInputObjectSchema } from './EventCreateWithoutUsersInput.schema'
import { EventUncheckedCreateWithoutUsersInputObjectSchema } from './EventUncheckedCreateWithoutUsersInput.schema'
import { EventCreateOrConnectWithoutUsersInputObjectSchema } from './EventCreateOrConnectWithoutUsersInput.schema'
import { EventUpsertWithWhereUniqueWithoutUsersInputObjectSchema } from './EventUpsertWithWhereUniqueWithoutUsersInput.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithWhereUniqueWithoutUsersInputObjectSchema } from './EventUpdateWithWhereUniqueWithoutUsersInput.schema'
import { EventUpdateManyWithWhereWithoutUsersInputObjectSchema } from './EventUpdateManyWithWhereWithoutUsersInput.schema'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateManyWithoutUsersNestedInput> = z
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
    upsert: z
      .union([
        z.lazy(() => EventUpsertWithWhereUniqueWithoutUsersInputObjectSchema),
        z.lazy(() => EventUpsertWithWhereUniqueWithoutUsersInputObjectSchema).array()
      ])
      .optional(),
    set: z
      .union([z.lazy(() => EventWhereUniqueInputObjectSchema), z.lazy(() => EventWhereUniqueInputObjectSchema).array()])
      .optional(),
    disconnect: z
      .union([z.lazy(() => EventWhereUniqueInputObjectSchema), z.lazy(() => EventWhereUniqueInputObjectSchema).array()])
      .optional(),
    delete: z
      .union([z.lazy(() => EventWhereUniqueInputObjectSchema), z.lazy(() => EventWhereUniqueInputObjectSchema).array()])
      .optional(),
    connect: z
      .union([z.lazy(() => EventWhereUniqueInputObjectSchema), z.lazy(() => EventWhereUniqueInputObjectSchema).array()])
      .optional(),
    update: z
      .union([
        z.lazy(() => EventUpdateWithWhereUniqueWithoutUsersInputObjectSchema),
        z.lazy(() => EventUpdateWithWhereUniqueWithoutUsersInputObjectSchema).array()
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => EventUpdateManyWithWhereWithoutUsersInputObjectSchema),
        z.lazy(() => EventUpdateManyWithWhereWithoutUsersInputObjectSchema).array()
      ])
      .optional(),
    deleteMany: z
      .union([z.lazy(() => EventScalarWhereInputObjectSchema), z.lazy(() => EventScalarWhereInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const EventUpdateManyWithoutUsersNestedInputObjectSchema = Schema
