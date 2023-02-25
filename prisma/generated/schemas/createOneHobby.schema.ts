import { z } from 'zod'
import { HobbyCreateInputObjectSchema } from './objects/HobbyCreateInput.schema'
import { HobbyUncheckedCreateInputObjectSchema } from './objects/HobbyUncheckedCreateInput.schema'

export const HobbyCreateOneSchema = z.object({
  data: z.union([HobbyCreateInputObjectSchema, HobbyUncheckedCreateInputObjectSchema])
})
