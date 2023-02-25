import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'

export const EventFindUniqueSchema = z.object({ where: EventWhereUniqueInputObjectSchema })
