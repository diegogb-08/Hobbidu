import { z } from 'zod'
import { FollowerSelectObjectSchema } from './objects/FollowerSelect.schema'
import { FollowerOrderByWithRelationInputObjectSchema } from './objects/FollowerOrderByWithRelationInput.schema'
import { FollowerWhereInputObjectSchema } from './objects/FollowerWhereInput.schema'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'
import { FollowerScalarFieldEnumSchema } from './enums/FollowerScalarFieldEnum.schema'

export const FollowerFindFirstSchema = z.object({
  select: FollowerSelectObjectSchema.optional(),
  orderBy: z
    .union([FollowerOrderByWithRelationInputObjectSchema, FollowerOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: FollowerWhereInputObjectSchema.optional(),
  cursor: FollowerWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(FollowerScalarFieldEnumSchema).optional()
})
