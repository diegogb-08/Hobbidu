import { z } from 'zod'
import { FollowerUpdateInputObjectSchema } from './objects/FollowerUpdateInput.schema'
import { FollowerUncheckedUpdateInputObjectSchema } from './objects/FollowerUncheckedUpdateInput.schema'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'

export const FollowerUpdateOneSchema = z.object({
  data: z.union([FollowerUpdateInputObjectSchema, FollowerUncheckedUpdateInputObjectSchema]),
  where: FollowerWhereUniqueInputObjectSchema
})
