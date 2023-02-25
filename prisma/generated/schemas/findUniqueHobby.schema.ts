import { z } from 'zod'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'

export const HobbyFindUniqueSchema = z.object({ where: HobbyWhereUniqueInputObjectSchema })
