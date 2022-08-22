import type { User } from '@prisma/client'
import type { TypedResponse } from '@remix-run/server-runtime'

export enum ActionValue {
  STANDARD = 'standard',
  GOOGLE = 'google'
}

export type ActionData =
  | {
      email?: string
      password?: string
    }
  | {
      name: undefined | string
      user_name: undefined | string
      email: undefined | string
      password: undefined | string
    }
  | undefined

export interface UserAuth {
  user: User
  token: string
}

export type ErrorAuth = TypedResponse<{ errors: ActionData }>

export type ActionAuth = UserAuth | ErrorAuth
