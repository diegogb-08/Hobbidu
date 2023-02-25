import { z } from 'zod'
import { FollowerCreateInputObjectSchema } from './objects/FollowerCreateInput.schema'
import { FollowerUncheckedCreateInputObjectSchema } from './objects/FollowerUncheckedCreateInput.schema'

export const FollowerCreateOneSchema = z.object({
  data: z.union([FollowerCreateInputObjectSchema, FollowerUncheckedCreateInputObjectSchema])
})
