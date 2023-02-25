import { z } from 'zod'
import { FollowerWhereInputObjectSchema } from './objects/FollowerWhereInput.schema'

export const FollowerDeleteManySchema = z.object({ where: FollowerWhereInputObjectSchema.optional() })
