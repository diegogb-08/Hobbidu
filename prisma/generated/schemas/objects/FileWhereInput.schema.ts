import { z } from 'zod'
import { StringFilterObjectSchema } from './StringFilter.schema'
import { IntFilterObjectSchema } from './IntFilter.schema'
import { BytesFilterObjectSchema } from './BytesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileWhereInput> = z
  .object({
    AND: z
      .union([z.lazy(() => FileWhereInputObjectSchema), z.lazy(() => FileWhereInputObjectSchema).array()])
      .optional(),
    OR: z
      .lazy(() => FileWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([z.lazy(() => FileWhereInputObjectSchema), z.lazy(() => FileWhereInputObjectSchema).array()])
      .optional(),
    id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    mimeType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
    size: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    data: z.union([z.lazy(() => BytesFilterObjectSchema), z.instanceof(Buffer)]).optional()
  })
  .strict()

export const FileWhereInputObjectSchema = Schema
