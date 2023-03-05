import { z } from 'zod'
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema'
import { BytesWithAggregatesFilterObjectSchema } from './BytesWithAggregatesFilter.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileScalarWhereWithAggregatesInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => FileScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => FileScalarWhereWithAggregatesInputObjectSchema).array()
      ])
      .optional(),
    OR: z
      .lazy(() => FileScalarWhereWithAggregatesInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => FileScalarWhereWithAggregatesInputObjectSchema),
        z.lazy(() => FileScalarWhereWithAggregatesInputObjectSchema).array()
      ])
      .optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    mimeType: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
    size: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number()]).optional(),
    data: z.union([z.lazy(() => BytesWithAggregatesFilterObjectSchema), z.instanceof(Buffer)]).optional()
  })
  .strict()

export const FileScalarWhereWithAggregatesInputObjectSchema = Schema
