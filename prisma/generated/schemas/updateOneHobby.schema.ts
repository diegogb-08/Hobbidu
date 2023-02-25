import { z } from 'zod'
import { HobbyUpdateInputObjectSchema } from './objects/HobbyUpdateInput.schema'
import { HobbyUncheckedUpdateInputObjectSchema } from './objects/HobbyUncheckedUpdateInput.schema'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'

export const HobbyUpdateOneSchema = z.object({
  data: z.union([HobbyUpdateInputObjectSchema, HobbyUncheckedUpdateInputObjectSchema]),
  where: HobbyWhereUniqueInputObjectSchema
})
