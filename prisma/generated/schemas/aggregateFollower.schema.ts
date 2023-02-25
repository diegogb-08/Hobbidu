import { z } from 'zod'
import { FollowerOrderByWithRelationInputObjectSchema } from './objects/FollowerOrderByWithRelationInput.schema'
import { FollowerWhereInputObjectSchema } from './objects/FollowerWhereInput.schema'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'
import { FollowerCountAggregateInputObjectSchema } from './objects/FollowerCountAggregateInput.schema'
import { FollowerMinAggregateInputObjectSchema } from './objects/FollowerMinAggregateInput.schema'
import { FollowerMaxAggregateInputObjectSchema } from './objects/FollowerMaxAggregateInput.schema'

export const FollowerAggregateSchema = z.object({
  orderBy: z
    .union([FollowerOrderByWithRelationInputObjectSchema, FollowerOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: FollowerWhereInputObjectSchema.optional(),
  cursor: FollowerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  _count: z.union([z.literal(true), FollowerCountAggregateInputObjectSchema]).optional(),
  _min: FollowerMinAggregateInputObjectSchema.optional(),
  _max: FollowerMaxAggregateInputObjectSchema.optional()
})
