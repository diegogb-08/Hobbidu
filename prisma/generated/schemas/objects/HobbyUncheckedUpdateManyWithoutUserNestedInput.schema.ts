import { z } from 'zod'
import { HobbyCreateWithoutUserInputObjectSchema } from './HobbyCreateWithoutUserInput.schema'
import { HobbyUncheckedCreateWithoutUserInputObjectSchema } from './HobbyUncheckedCreateWithoutUserInput.schema'
import { HobbyCreateOrConnectWithoutUserInputObjectSchema } from './HobbyCreateOrConnectWithoutUserInput.schema'
import { HobbyUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './HobbyUpsertWithWhereUniqueWithoutUserInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './HobbyWhereUniqueInput.schema'
import { HobbyUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './HobbyUpdateWithWhereUniqueWithoutUserInput.schema'
import { HobbyUpdateManyWithWhereWithoutUserInputObjectSchema } from './HobbyUpdateManyWithWhereWithoutUserInput.schema'
import { HobbyScalarWhereInputObjectSchema } from './HobbyScalarWhereInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUncheckedUpdateManyWithoutUserNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => HobbyCreateWithoutUserInputObjectSchema),
        z.lazy(() => HobbyCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => HobbyUncheckedCreateWithoutUserInputObjectSchema),
        z.lazy(() => HobbyUncheckedCreateWithoutUserInputObjectSchema).array()
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => HobbyCreateOrConnectWithoutUserInputObjectSchema),
        z.lazy(() => HobbyCreateOrConnectWithoutUserInputObjectSchema).array()
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => HobbyUpsertWithWhereUniqueWithoutUserInputObjectSchema),
        z.lazy(() => HobbyUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()
      ])
      .optional(),
    set: z
      .union([z.lazy(() => HobbyWhereUniqueInputObjectSchema), z.lazy(() => HobbyWhereUniqueInputObjectSchema).array()])
      .optional(),
    disconnect: z
      .union([z.lazy(() => HobbyWhereUniqueInputObjectSchema), z.lazy(() => HobbyWhereUniqueInputObjectSchema).array()])
      .optional(),
    delete: z
      .union([z.lazy(() => HobbyWhereUniqueInputObjectSchema), z.lazy(() => HobbyWhereUniqueInputObjectSchema).array()])
      .optional(),
    connect: z
      .union([z.lazy(() => HobbyWhereUniqueInputObjectSchema), z.lazy(() => HobbyWhereUniqueInputObjectSchema).array()])
      .optional(),
    update: z
      .union([
        z.lazy(() => HobbyUpdateWithWhereUniqueWithoutUserInputObjectSchema),
        z.lazy(() => HobbyUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => HobbyUpdateManyWithWhereWithoutUserInputObjectSchema),
        z.lazy(() => HobbyUpdateManyWithWhereWithoutUserInputObjectSchema).array()
      ])
      .optional(),
    deleteMany: z
      .union([z.lazy(() => HobbyScalarWhereInputObjectSchema), z.lazy(() => HobbyScalarWhereInputObjectSchema).array()])
      .optional()
  })
  .strict()

export const HobbyUncheckedUpdateManyWithoutUserNestedInputObjectSchema = Schema
