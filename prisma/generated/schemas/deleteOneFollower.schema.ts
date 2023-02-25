import { z } from 'zod'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'

export const FollowerDeleteOneSchema = z.object({ where: FollowerWhereUniqueInputObjectSchema })
