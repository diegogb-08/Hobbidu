import { z } from 'zod'
import { FollowerSelectObjectSchema } from './objects/FollowerSelect.schema'
import { FollowerWhereUniqueInputObjectSchema } from './objects/FollowerWhereUniqueInput.schema'
import { FollowerCreateInputObjectSchema } from './objects/FollowerCreateInput.schema'
import { FollowerUncheckedCreateInputObjectSchema } from './objects/FollowerUncheckedCreateInput.schema'
import { FollowerUpdateInputObjectSchema } from './objects/FollowerUpdateInput.schema'
import { FollowerUncheckedUpdateInputObjectSchema } from './objects/FollowerUncheckedUpdateInput.schema'

export const FollowerUpsertSchema = z.object({
  select: FollowerSelectObjectSchema.optional(),
  where: FollowerWhereUniqueInputObjectSchema,
  create: z.union([FollowerCreateInputObjectSchema, FollowerUncheckedCreateInputObjectSchema]),
  update: z.union([FollowerUpdateInputObjectSchema, FollowerUncheckedUpdateInputObjectSchema])
})
