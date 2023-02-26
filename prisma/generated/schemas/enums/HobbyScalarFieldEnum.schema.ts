import { z } from 'zod'

export const HobbyScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'name', 'userIDs'])
