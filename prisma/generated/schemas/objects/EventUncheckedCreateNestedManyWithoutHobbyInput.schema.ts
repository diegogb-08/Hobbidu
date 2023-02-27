import { z } from 'zod'
import { EventCreateWithoutHobbyInputObjectSchema } from './EventCreateWithoutHobbyInput.schema'
import { EventUncheckedCreateWithoutHobbyInputObjectSchema } from './EventUncheckedCreateWithoutHobbyInput.schema'
import { EventCreateOrConnectWithoutHobbyInputObjectSchema } from './EventCreateOrConnectWithoutHobbyInput.schema'
import { EventCreateManyHobbyInputEnvelopeObjectSchema } from './EventCreateManyHobbyInputEnvelope.schema'
import { EventWhereUniqueInputObjectSchema } from './EventWhereUniqueInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUncheckedCreateNestedManyWithoutHobbyInput> = z
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
    createMany: z.lazy(() => EventCreateManyHobbyInputEnvelopeObjectSchema).optional(),
    connect: z
      .union([z.lazy(() => EventWhereUniqueInputObjectSchema), z.lazy(() => EventWhereUniqueInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const EventUncheckedCreateNestedManyWithoutHobbyInputObjectSchema = Schema
