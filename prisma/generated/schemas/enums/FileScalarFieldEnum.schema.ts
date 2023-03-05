import { z } from 'zod'

export const FileScalarFieldEnumSchema = z.enum(['id', 'name', 'mimeType', 'size', 'data'])
