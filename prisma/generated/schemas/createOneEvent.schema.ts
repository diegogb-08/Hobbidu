import { z } from 'zod'
import { EventCreateInputObjectSchema } from './objects/EventCreateInput.schema'
import { EventUncheckedCreateInputObjectSchema } from './objects/EventUncheckedCreateInput.schema'

export const EventCreateOneSchema = z.object({
  data: z.union([EventCreateInputObjectSchema, EventUncheckedCreateInputObjectSchema])
})
