import { z } from 'zod'
import { HobbyCreateManyInputObjectSchema } from './objects/HobbyCreateManyInput.schema'

export const HobbyCreateManySchema = z.object({
  data: z.union([HobbyCreateManyInputObjectSchema, z.array(HobbyCreateManyInputObjectSchema)])
})
