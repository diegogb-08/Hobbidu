import { z } from 'zod'
import { HobbyWhereUniqueInputObjectSchema } from './objects/HobbyWhereUniqueInput.schema'

export const HobbyDeleteOneSchema = z.object({ where: HobbyWhereUniqueInputObjectSchema })
