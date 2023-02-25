import { z } from 'zod'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { CommentCountOrderByAggregateInputObjectSchema } from './CommentCountOrderByAggregateInput.schema'
import { CommentMaxOrderByAggregateInputObjectSchema } from './CommentMaxOrderByAggregateInput.schema'
import { CommentMinOrderByAggregateInputObjectSchema } from './CommentMinOrderByAggregateInput.schema'

import type { Prisma } from '@prisma/client'

const Schema: z.ZodType<Prisma.CommentOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    event_id: z.lazy(() => SortOrderSchema).optional(),
    post_id: z.lazy(() => SortOrderSchema).optional(),
    user_id: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => CommentCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => CommentMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => CommentMinOrderByAggregateInputObjectSchema).optional()
  })
  .strict()

export const CommentOrderByWithAggregationInputObjectSchema = Schema
