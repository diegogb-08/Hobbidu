import { z } from 'zod'
import { HobbyWhereInputObjectSchema } from './objects/HobbyWhereInput.schema'
import { HobbyOrderByWithAggregationInputObjectSchema } from './objects/HobbyOrderByWithAggregationInput.schema'
import { HobbyScalarWhereWithAggregatesInputObjectSchema } from './objects/HobbyScalarWhereWithAggregatesInput.schema'
import { HobbyScalarFieldEnumSchema } from './enums/HobbyScalarFieldEnum.schema'

export const HobbyGroupBySchema = z.object({
  where: HobbyWhereInputObjectSchema.optional(),
  orderBy: z
    .union([HobbyOrderByWithAggregationInputObjectSchema, HobbyOrderByWithAggregationInputObjectSchema.array()])
    .optional(),
  having: HobbyScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(HobbyScalarFieldEnumSchema)
})
