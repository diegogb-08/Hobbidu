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

export interface UserAuth {
  user: User
  token: string
}

export type HobbiesRecord = Record<string, Hobby>
