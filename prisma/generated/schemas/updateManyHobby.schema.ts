import { z } from 'zod'
import { HobbyUpdateManyMutationInputObjectSchema } from './objects/HobbyUpdateManyMutationInput.schema'
import { HobbyWhereInputObjectSchema } from './objects/HobbyWhereInput.schema'

export const HobbyUpdateManySchema = z.object({
  data: HobbyUpdateManyMutationInputObjectSchema,
  where: HobbyWhereInputObjectSchema.optional()
})
