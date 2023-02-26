import { z } from 'zod'
import { HobbyScalarWhereInputObjectSchema } from './HobbyScalarWhereInput.schema'
import { HobbyUpdateManyMutationInputObjectSchema } from './HobbyUpdateManyMutationInput.schema'
import { HobbyUncheckedUpdateManyWithoutHobbiesInputObjectSchema } from './HobbyUncheckedUpdateManyWithoutHobbiesInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.HobbyUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => HobbyScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => HobbyUpdateManyMutationInputObjectSchema),
      z.lazy(() => HobbyUncheckedUpdateManyWithoutHobbiesInputObjectSchema)
    ])
  })
  .strict()

export const HobbyUpdateManyWithWhereWithoutUserInputObjectSchema = Schema
