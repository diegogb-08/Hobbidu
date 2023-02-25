import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'
import { EventCreateInputObjectSchema } from './objects/EventCreateInput.schema'
import { EventUncheckedCreateInputObjectSchema } from './objects/EventUncheckedCreateInput.schema'
import { EventUpdateInputObjectSchema } from './objects/EventUpdateInput.schema'
import { EventUncheckedUpdateInputObjectSchema } from './objects/EventUncheckedUpdateInput.schema'

export const EventUpsertSchema = z.object({
  where: EventWhereUniqueInputObjectSchema,
  create: z.union([EventCreateInputObjectSchema, EventUncheckedCreateInputObjectSchema]),
  update: z.union([EventUpdateInputObjectSchema, EventUncheckedUpdateInputObjectSchema])
})
