import { z } from 'zod'
import { PostCreatelikeInputObjectSchema } from './PostCreatelikeInput.schema'
import { LocationCreateEnvelopeInputObjectSchema } from './LocationCreateEnvelopeInput.schema'
import { LocationCreateInputObjectSchema } from './LocationCreateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    description: z.string(),
    hobby_id: z.string(),
    image: z.string(),
    like: z.union([z.lazy(() => PostCreatelikeInputObjectSchema), z.string().array()]).optional(),
    location: z.union([
      z.lazy(() => LocationCreateEnvelopeInputObjectSchema),
      z.lazy(() => LocationCreateInputObjectSchema)
    ]),
    user_id: z.string()
  })
  .strict()

export const PostCreateInputObjectSchema = Schema
