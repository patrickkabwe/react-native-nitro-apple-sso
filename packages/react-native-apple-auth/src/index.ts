export * from './specs/apple-auth.nitro'
import { NitroModules } from 'react-native-nitro-modules'
import type { AppleAuth } from './specs/apple-auth.nitro'

export const RNAppleAuth =
  NitroModules.createHybridObject<AppleAuth>('AppleAuth')
