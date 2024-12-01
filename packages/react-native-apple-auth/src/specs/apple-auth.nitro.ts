import { type HybridObject } from 'react-native-nitro-modules'

export enum AppleAuthScopes {
  FULL_NAME,
  EMAIL,
}

export enum AppleAuthOperation {
  LOGIN,
  LOGOUT,
  IMPLICIT
}

export enum RealUserStatus {
  UNSUPPORTED,
  UNKNOWN,
  LIKELY_REAL,
}

export type AppleAuthCredential = {
  user: string
  email?: string
  fullName?: string
  authorizationCode?: string
  identityToken?: string
  state?: string
}

export type AppleAuthOptions = {
  operation?: AppleAuthOperation
  scopes: AppleAuthScopes[]
  nonce?: string
}

export interface AppleAuth
  extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  signIn(options: AppleAuthOptions): Promise<AppleAuthCredential | null>
}
