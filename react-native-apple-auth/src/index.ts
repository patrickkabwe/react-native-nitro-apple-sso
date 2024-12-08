
export  { type AppleAuthCredential, AppleAuthOperation, AppleAuthScopes, RealUserStatus } from './specs/apple-auth.nitro'
import { NitroModules } from 'react-native-nitro-modules'
import type { AppleAuth as AppleAuthSpec } from './specs/apple-auth.nitro'

export const AppleAuth =
  NitroModules.createHybridObject<AppleAuthSpec>('AppleAuth')
