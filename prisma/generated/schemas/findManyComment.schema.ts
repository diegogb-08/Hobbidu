import { z } from 'zod'
import { CommentSelectObjectSchema } from './objects/CommentSelect.schema'
import { CommentOrderByWithRelationInputObjectSchema } from './objects/CommentOrderByWithRelationInput.schema'
import { CommentWhereInputObjectSchema } from './objects/CommentWhereInput.schema'
import { CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema'
import { CommentScalarFieldEnumSchema } from './enums/CommentScalarFieldEnum.schema'

export const CommentFindManySchema = z.object({
  select: z.lazy(() => CommentSelectObjectSchema.optional()),
  orderBy: z
    .union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: CommentWhereInputObjectSchema.optional(),
  cursor: CommentWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(CommentScalarFieldEnumSchema).optional()
})
