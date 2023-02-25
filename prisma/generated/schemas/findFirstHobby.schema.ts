import { z } from 'zod'
import { HobbyOrderByWithRelationInputObjectSchema } from './objects/HobbyOrderByWithRelationInput.schema'
import { HobbyWhereInputObjectSchema } from './objects/HobbyWhereInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'
import { HobbyScalarFieldEnumSchema } from './enums/HobbyScalarFieldEnum.schema'

export const HobbyFindFirstSchema = z.object({
  orderBy: z
    .union([HobbyOrderByWithRelationInputObjectSchema, HobbyOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: HobbyWhereInputObjectSchema.optional(),
  cursor: HobbyWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(HobbyScalarFieldEnumSchema).optional()
})
