import { z } from 'zod'
import { FollowerCreateManyInputObjectSchema } from './objects/FollowerCreateManyInput.schema'

export const FollowerCreateManySchema = z.object({
  data: z.union([FollowerCreateManyInputObjectSchema, z.array(FollowerCreateManyInputObjectSchema)])
})
