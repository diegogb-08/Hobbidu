import { z } from 'zod'
import { FollowerSelectObjectSchema } from './objects/FollowerSelect.schema'
import { FollowerCreateInputObjectSchema } from './objects/FollowerCreateInput.schema'
import { FollowerUncheckedCreateInputObjectSchema } from './objects/FollowerUncheckedCreateInput.schema'

export const FollowerCreateOneSchema = z.object({
  select: FollowerSelectObjectSchema.optional(),
  data: z.union([FollowerCreateInputObjectSchema, FollowerUncheckedCreateInputObjectSchema])
})
