import { z } from 'zod'
import { HobbySelectObjectSchema } from './objects/HobbySelect.schema'
import { HobbyIncludeObjectSchema } from './objects/HobbyInclude.schema'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'
import { HobbyCreateInputObjectSchema } from './objects/HobbyCreateInput.schema'
import { HobbyUncheckedCreateInputObjectSchema } from './objects/HobbyUncheckedCreateInput.schema'
import { HobbyUpdateInputObjectSchema } from './objects/HobbyUpdateInput.schema'
import { HobbyUncheckedUpdateInputObjectSchema } from './objects/HobbyUncheckedUpdateInput.schema'

export const HobbyUpsertSchema = z.object({
  select: HobbySelectObjectSchema.optional(),
  include: HobbyIncludeObjectSchema.optional(),
  where: HobbyWhereUniqueInputObjectSchema,
  create: z.union([HobbyCreateInputObjectSchema, HobbyUncheckedCreateInputObjectSchema]),
  update: z.union([HobbyUpdateInputObjectSchema, HobbyUncheckedUpdateInputObjectSchema])
})
