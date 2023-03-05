import { z } from 'zod'
import { FileSelectObjectSchema } from './objects/FileSelect.schema'
import { FileOrderByWithRelationInputObjectSchema } from './objects/FileOrderByWithRelationInput.schema'
import { FileWhereInputObjectSchema } from './objects/FileWhereInput.schema'
import { FileWhereUniqueInputObjectSchema } from './objects/FileWhereUniqueInput.schema'
import { FileScalarFieldEnumSchema } from './enums/FileScalarFieldEnum.schema'

export const FileFindManySchema = z.object({
  select: z.lazy(() => FileSelectObjectSchema.optional()),
  orderBy: z
    .union([FileOrderByWithRelationInputObjectSchema, FileOrderByWithRelationInputObjectSchema.array()])
    .optional(),
  where: FileWhereInputObjectSchema.optional(),
  cursor: FileWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(FileScalarFieldEnumSchema).optional()
})
