import { z } from 'zod'
import { FollowerSelectObjectSchema } from './objects/FollowerSelect.schema'
import { FollowerUpdateInputObjectSchema } from './objects/FollowerUpdateInput.schema'
import { FollowerUncheckedUpdateInputObjectSchema } from './objects/FollowerUncheckedUpdateInput.schema'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'

export const FollowerUpdateOneSchema = z.object({
  select: FollowerSelectObjectSchema.optional(),
  data: z.union([FollowerUpdateInputObjectSchema, FollowerUncheckedUpdateInputObjectSchema]),
  where: FollowerWhereUniqueInputObjectSchema
})
