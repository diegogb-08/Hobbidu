import { z } from 'zod'
import { FollowerWhereInputObjectSchema } from './objects/FollowerWhereInput.schema'
import { FollowerOrderByWithAggregationInputObjectSchema } from './objects/FollowerOrderByWithAggregationInput.schema'
import { FollowerScalarWhereWithAggregatesInputObjectSchema } from './objects/FollowerScalarWhereWithAggregatesInput.schema'
import { FollowerScalarFieldEnumSchema } from './enums/FollowerScalarFieldEnum.schema'

export const FollowerGroupBySchema = z.object({
  where: FollowerWhereInputObjectSchema.optional(),
  orderBy: z
    .union([FollowerOrderByWithAggregationInputObjectSchema, FollowerOrderByWithAggregationInputObjectSchema.array()])
    .optional(),
  having: FollowerScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(FollowerScalarFieldEnumSchema)
})
