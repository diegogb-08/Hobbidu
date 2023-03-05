import { z } from 'zod'
import { FileSelectObjectSchema } from './objects/FileSelect.schema'
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema'

export const FileDeleteOneSchema = z.object({
  select: FileSelectObjectSchema.optional(),
  where: FileWhereUniqueInputObjectSchema
})
