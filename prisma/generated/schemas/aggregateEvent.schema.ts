import { z } from 'zod'
import { EventOrderByWithRelationInputObjectSchema } from './objects/EventOrderByWithRelationInput.schema'
import { EventWhereInputObjectSchema } from './objects/EventWhereInput.schema'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'
import { EventCountAggregateInputObjectSchema } from './objects/EventCountAggregateInput.schema'
import { EventMinAggregateInputObjectSchema } from './objects/EventMinAggregateInput.schema'
import { EventMaxAggregateInputObjectSchema } from './objects/EventMaxAggregateInput.schema'
import { EventAvgAggregateInputObjectSchema } from './objects/EventAvgAggregateInput.schema'
import { EventSumAggregateInputObjectSchema } from './objects/EventSumAggregateInput.schema'

export const EventAggregateSchema = z.object({
  orderBy: z
    .union([EventOrderByWithRelationInputObjectSchema, EventOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: EventWhereInputObjectSchema.optional(),
  cursor: EventWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), EventCountAggregateInputObjectSchema]).optional(),
  _min: EventMinAggregateInputObjectSchema.optional(),
  _max: EventMaxAggregateInputObjectSchema.optional(),
  _avg: EventAvgAggregateInputObjectSchema.optional(),
  _sum: EventSumAggregateInputObjectSchema.optional()
})
