import type { User } from '@prisma/client'

export enum AuthStrategy {
  STANDARD = 'standard',
  GOOGLE = 'google'
}

export interface Values {
  name?: FormDataEntryValue | null
  user_name?: FormDataEntryValue | null
  email: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export interface Errors {
  name?: string
  user_name?: string
  email?: string
  password?: string
}

export interface Validation {
  errors: Errors
  values: Values
}
export interface UserAuth {
  user: User
  token: string
}
