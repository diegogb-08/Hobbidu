import { z } from 'zod'
import { HobbyWhereInputObjectSchema } from './objects/HobbyWhereInput.schema'

export const HobbyDeleteManySchema = z.object({ where: HobbyWhereInputObjectSchema.optional() })
