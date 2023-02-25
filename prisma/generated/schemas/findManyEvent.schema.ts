import { z } from 'zod'
import { EventOrderByWithRelationInputObjectSchema } from './objects/EventOrderByWithRelationInput.schema'
import { EventWhereInputObjectSchema } from './objects/EventWhereInput.schema'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'
import { EventScalarFieldEnumSchema } from './enums/EventScalarFieldEnum.schema'

export const EventFindManySchema = z.object({
  orderBy: z
    .union([EventOrderByWithRelationInputObjectSchema, EventOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: EventWhereInputObjectSchema.optional(),
  cursor: EventWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(EventScalarFieldEnumSchema).optional()
})
