import { z } from 'zod'

export const RoleSchema = z.enum(['Standard', 'Admin'])
