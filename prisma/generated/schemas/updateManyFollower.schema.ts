import { z } from 'zod'
import { FollowerUpdateManyMutationInputObjectSchema } from './objects/FollowerUpdateManyMutationInput.schema'
import { FollowerWhereInputObjectSchema } from './objects/FollowerWhereInput.schema'

export const FollowerUpdateManySchema = z.object({
  data: FollowerUpdateManyMutationInputObjectSchema,
  where: FollowerWhereInputObjectSchema.optional()
})
