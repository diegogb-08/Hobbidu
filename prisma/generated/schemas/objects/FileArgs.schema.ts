import { z } from 'zod'
import { FileSelectObjectSchema } from './FileSelect.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileArgs> = z
  .object({
    select: z.lazy(() => FileSelectObjectSchema).optional()
  })
  .strict()

export const FileArgsObjectSchema = Schema
