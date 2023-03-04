import { z } from 'zod'
import { HobbySelectObjectSchema } from './objects/HobbySelect.schema'
import { HobbyIncludeObjectSchema } from './objects/HobbyInclude.schema'
import { HobbyOrderByWithRelationInputObjectSchema } from './objects/HobbyOrderByWithRelationInput.schema'
import { HobbyWhereInputObjectSchema } from './objects/HobbyWhereInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'
import { HobbyScalarFieldEnumSchema } from './enums/HobbyScalarFieldEnum.schema'

export const HobbyFindManySchema = z.object({
  select: z.lazy(() => HobbySelectObjectSchema.optional()),
  include: z.lazy(() => HobbyIncludeObjectSchema.optional()),
  orderBy: z
    .union([HobbyOrderByWithRelationInputObjectSchema, HobbyOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: HobbyWhereInputObjectSchema.optional(),
  cursor: HobbyWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(HobbyScalarFieldEnumSchema).optional()
})
