import { z } from 'zod'
import { CommentSelectObjectSchema } from './objects/CommentSelect.schema'
import { CommentCreateInputObjectSchema } from './objects/CommentCreateInput.schema'
import { CommentUncheckedCreateInputObjectSchema } from './objects/CommentUncheckedCreateInput.schema'

export const CommentCreateOneSchema = z.object({
  select: CommentSelectObjectSchema.optional(),
  data: z.union([CommentCreateInputObjectSchema, CommentUncheckedCreateInputObjectSchema])
})
