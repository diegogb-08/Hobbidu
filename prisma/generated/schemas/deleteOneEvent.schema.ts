import { z } from 'zod'
import { EventWhereUniqueInputObjectSchema } from './objects/EventWhereUniqueInput.schema'

export const EventDeleteOneSchema = z.object({ where: EventWhereUniqueInputObjectSchema })
