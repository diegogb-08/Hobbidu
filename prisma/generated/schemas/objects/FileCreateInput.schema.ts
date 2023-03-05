import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    mimeType: z.string(),
    size: z.number(),
    data: z.instanceof(Buffer)
  })
  .strict()

export const FileCreateInputObjectSchema = Schema
