import { z } from 'zod'
import { EventCreateWithoutHobbyInputObjectSchema } from './EventCreateWithoutHobbyInput.schema'
import { EventUncheckedCreateWithoutHobbyInputObjectSchema } from './EventUncheckedCreateWithoutHobbyInput.schema'
import { EventCreateOrConnectWithoutHobbyInputObjectSchema } from './EventCreateOrConnectWithoutHobbyInput.schema'
import { EventUpsertWithWhereUniqueWithoutHobbyInputObjectSchema } from './EventUpsertWithWhereUniqueWithoutHobbyInput.schema'
import { EventCreateManyHobbyInputEnvelopeObjectSchema } from './EventCreateManyHobbyInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'
import { EventUpdateWithWhereUniqueWithoutHobbyInputObjectSchema } from './EventUpdateWithWhereUniqueWithoutHobbyInput.schema'
import { EventUpdateManyWithWhereWithoutHobbyInputObjectSchema } from './EventUpdateManyWithWhereWithoutHobbyInput.schema'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedUpdateManyWithoutHobbyNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EventCreateWithoutHobbyInputObjectSchema),
        z.lazy(() => EventCreateWithoutHobbyInputObjectSchema).array(),
        z.lazy(() => EventUncheckedCreateWithoutHobbyInputObjectSchema),
        z.lazy(() => EventUncheckedCreateWithoutHobbyInputObjectSchema).array()
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => EventCreateOrConnectWithoutHobbyInputObjectSchema),
        z.lazy(() => EventCreateOrConnectWithoutHobbyInputObjectSchema).array()
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => EventUpsertWithWhereUniqueWithoutHobbyInputObjectSchema),
        z.lazy(() => EventUpsertWithWhereUniqueWithoutHobbyInputObjectSchema).array()
      ])
      .optional(),
    createMany: z.lazy(() => EventCreateManyHobbyInputEnvelopeObjectSchema).optional(),
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
        z.lazy(() => EventUpdateWithWhereUniqueWithoutHobbyInputObjectSchema),
        z.lazy(() => EventUpdateWithWhereUniqueWithoutHobbyInputObjectSchema).array()
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => EventUpdateManyWithWhereWithoutHobbyInputObjectSchema),
        z.lazy(() => EventUpdateManyWithWhereWithoutHobbyInputObjectSchema).array()
      ])
      .optional(),
    deleteMany: z
      .union([z.lazy(() => EventScalarWhereInputObjectSchema), z.lazy(() => EventScalarWhereInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const EventUncheckedUpdateManyWithoutHobbyNestedInputObjectSchema = Schema
