import { z } from 'zod'
import { HobbySelectObjectSchema } from './objects/HobbySelect.schema'
import { HobbyIncludeObjectSchema } from './objects/HobbyInclude.schema'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'

export const HobbyFindUniqueSchema = z.object({
  select: HobbySelectObjectSchema.optional(),
  include: HobbyIncludeObjectSchema.optional(),
  where: HobbyWhereUniqueInputObjectSchema
})
