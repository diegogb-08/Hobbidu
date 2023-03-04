import { z } from 'zod'
import { CommentSelectObjectSchema } from './objects/CommentSelect.schema'
import { CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema'

export const CommentDeleteOneSchema = z.object({
  select: CommentSelectObjectSchema.optional(),
  where: CommentWhereUniqueInputObjectSchema
})
