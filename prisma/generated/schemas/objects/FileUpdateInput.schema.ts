import { z } from 'zod'
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'
import { IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'
import { BytesFieldUpdateOperationsInputObjectSchema } from './BytesFieldUpdateOperationsInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.FileUpdateInput> = z
  .object({
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
    size: z.union([z.number(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
    data: z.union([z.instanceof(Buffer), z.lazy(() => BytesFieldUpdateOperationsInputObjectSchema)]).optional()
  })
  .strict()

export const FileUpdateInputObjectSchema = Schema
