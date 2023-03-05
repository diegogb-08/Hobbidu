import { z } from 'zod'
import { FileSelectObjectSchema } from './objects/FileSelect.schema'
import { FileCreateInputObjectSchema } from './objects/FileCreateInput.schema'
import { FileUncheckedCreateInputObjectSchema } from './objects/FileUncheckedCreateInput.schema'

export const FileCreateOneSchema = z.object({
  select: FileSelectObjectSchema.optional(),
  data: z.union([FileCreateInputObjectSchema, FileUncheckedCreateInputObjectSchema])
})
