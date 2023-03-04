import { z } from 'zod'
import { HobbySelectObjectSchema } from './objects/HobbySelect.schema'
import { HobbyIncludeObjectSchema } from './objects/HobbyInclude.schema'
import { HobbyCreateInputObjectSchema } from './objects/HobbyCreateInput.schema'
import { HobbyUncheckedCreateInputObjectSchema } from './objects/HobbyUncheckedCreateInput.schema'

export const HobbyCreateOneSchema = z.object({
  select: HobbySelectObjectSchema.optional(),
  include: HobbyIncludeObjectSchema.optional(),
  data: z.union([HobbyCreateInputObjectSchema, HobbyUncheckedCreateInputObjectSchema])
})
