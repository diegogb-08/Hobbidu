import type { Hobby, User } from '@prisma/client'

export enum AuthStrategy {
  STANDARD = 'standard',
  GOOGLE = 'google'
}

export interface FormValues {
  name?: FormDataEntryValue | null
  user_name?: FormDataEntryValue | null
  email?: FormDataEntryValue | null
  password?: FormDataEntryValue | null
}

export interface Errors {
  message?: string
  emptyFields?: boolean
  name?: string
  user_name?: string
  email?: string
  password?: string
}

export interface Validation {
  errors: Errors
  values?: FormValues
}
export interface UserAuth {
  user: User
  token: string
}

export type HobbiesRecord = Record<string, Hobby>
