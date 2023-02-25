import { z } from 'zod'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'
import { HobbyCreateInputObjectSchema } from './objects/HobbyCreateInput.schema'
import { HobbyUncheckedCreateInputObjectSchema } from './objects/HobbyUncheckedCreateInput.schema'
import { HobbyUpdateInputObjectSchema } from './objects/HobbyUpdateInput.schema'
import { HobbyUncheckedUpdateInputObjectSchema } from './objects/HobbyUncheckedUpdateInput.schema'

export const HobbyUpsertSchema = z.object({
  where: HobbyWhereUniqueInputObjectSchema,
  create: z.union([HobbyCreateInputObjectSchema, HobbyUncheckedCreateInputObjectSchema]),
  update: z.union([HobbyUpdateInputObjectSchema, HobbyUncheckedUpdateInputObjectSchema])
})
