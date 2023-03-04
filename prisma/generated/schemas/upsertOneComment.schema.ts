import { z } from 'zod'
import { CommentSelectObjectSchema } from './objects/CommentSelect.schema'
import { CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema'
import { CommentCreateInputObjectSchema } from './objects/CommentCreateInput.schema'
import { CommentUncheckedCreateInputObjectSchema } from './objects/CommentUncheckedCreateInput.schema'
import { CommentUpdateInputObjectSchema } from './objects/CommentUpdateInput.schema'
import { CommentUncheckedUpdateInputObjectSchema } from './objects/CommentUncheckedUpdateInput.schema'

export const CommentUpsertSchema = z.object({
  select: CommentSelectObjectSchema.optional(),
  where: CommentWhereUniqueInputObjectSchema,
  create: z.union([CommentCreateInputObjectSchema, CommentUncheckedCreateInputObjectSchema]),
  update: z.union([CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema])
})
