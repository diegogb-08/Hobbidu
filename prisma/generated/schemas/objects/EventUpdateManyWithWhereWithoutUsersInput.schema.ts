import { z } from 'zod'
import { EventScalarWhereInputObjectSchema } from './EventScalarWhereInput.schema'
import { EventUpdateManyMutationInputObjectSchema } from './EventUpdateManyMutationInput.schema'
import { EventUncheckedUpdateManyWithoutEventsInputObjectSchema } from './EventUncheckedUpdateManyWithoutEventsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventUpdateManyWithWhereWithoutUsersInput> = z
  .object({
    where: z.lazy(() => EventScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => EventUpdateManyMutationInputObjectSchema),
      z.lazy(() => EventUncheckedUpdateManyWithoutEventsInputObjectSchema)
    ])
  })
  .strict()

export const EventUpdateManyWithWhereWithoutUsersInputObjectSchema = Schema
