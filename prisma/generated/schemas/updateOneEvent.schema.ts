import { z } from 'zod'
import { EventUpdateInputObjectSchema } from './objects/EventUpdateInput.schema'
import { EventUncheckedUpdateInputObjectSchema } from './objects/EventUncheckedUpdateInput.schema'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'

export const EventUpdateOneSchema = z.object({
  data: z.union([EventUpdateInputObjectSchema, EventUncheckedUpdateInputObjectSchema]),
  where: EventWhereUniqueInputObjectSchema
})
