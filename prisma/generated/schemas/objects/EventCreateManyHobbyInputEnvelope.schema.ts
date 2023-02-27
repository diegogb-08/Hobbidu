import { z } from 'zod'
import { EventCreateManyHobbyInputObjectSchema } from './EventCreateManyHobbyInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.EventCreateManyHobbyInputEnvelope> = z
  .object({
    data: z.lazy(() => EventCreateManyHobbyInputObjectSchema).array()
  })
  .strict()

export const EventCreateManyHobbyInputEnvelopeObjectSchema = Schema
