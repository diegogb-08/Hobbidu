import { z } from 'zod'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'

export const FollowerFindUniqueSchema = z.object({ where: FollowerWhereUniqueInputObjectSchema })
