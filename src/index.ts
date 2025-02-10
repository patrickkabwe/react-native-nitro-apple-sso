import { NitroModules } from 'react-native-nitro-modules'
import type { AppleAuth as AppleAuthSpec } from './specs/apple-auth.nitro'
export * from './types'

export const AppleAuth =
    NitroModules.createHybridObject<AppleAuthSpec>('AppleAuth')