import { z } from 'zod'
import { HobbyOrderByWithRelationInputObjectSchema } from './objects/HobbyOrderByWithRelationInput.schema'
import { HobbyWhereInputObjectSchema } from './objects/HobbyWhereInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'
import { HobbyCountAggregateInputObjectSchema } from './objects/HobbyCountAggregateInput.schema'
import { HobbyMinAggregateInputObjectSchema } from './objects/HobbyMinAggregateInput.schema'
import { HobbyMaxAggregateInputObjectSchema } from './objects/HobbyMaxAggregateInput.schema'

export const HobbyAggregateSchema = z.object({
  orderBy: z
    .union([HobbyOrderByWithRelationInputObjectSchema, HobbyOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: HobbyWhereInputObjectSchema.optional(),
  cursor: HobbyWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), HobbyCountAggregateInputObjectSchema]).optional(),
  _min: HobbyMinAggregateInputObjectSchema.optional(),
  _max: HobbyMaxAggregateInputObjectSchema.optional()
})
