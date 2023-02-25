import { z } from 'zod'

export const FollowerScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'follower_id', 'user_id'])
