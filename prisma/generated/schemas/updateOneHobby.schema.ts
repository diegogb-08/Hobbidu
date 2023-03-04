import { z } from 'zod'
import { HobbySelectObjectSchema } from './objects/HobbySelect.schema'
import { HobbyIncludeObjectSchema } from './objects/HobbyInclude.schema'
import { HobbyUpdateInputObjectSchema } from './objects/HobbyUpdateInput.schema'
import { HobbyUncheckedUpdateInputObjectSchema } from './objects/HobbyUncheckedUpdateInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'

export const HobbyUpdateOneSchema = z.object({
  select: HobbySelectObjectSchema.optional(),
  include: HobbyIncludeObjectSchema.optional(),
  data: z.union([HobbyUpdateInputObjectSchema, HobbyUncheckedUpdateInputObjectSchema]),
  where: HobbyWhereUniqueInputObjectSchema
})
