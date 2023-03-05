import { z } from 'zod'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    mimeType: z.boolean().optional(),
    size: z.boolean().optional(),
    data: z.boolean().optional()
  })
  .strict()

export const FileSelectObjectSchema = Schema
