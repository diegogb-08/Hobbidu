import { z } from 'zod'
import { FollowerSelectObjectSchema } from './objects/FollowerSelect.schema'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'

export const FollowerFindUniqueSchema = z.object({
  select: FollowerSelectObjectSchema.optional(),
  where: FollowerWhereUniqueInputObjectSchema
})
