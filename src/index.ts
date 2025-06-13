import { NitroModules } from 'react-native-nitro-modules'
import type { AppleAuth as AppleAuthSpec } from './specs/apple-auth.nitro'
export * from './types'

export const AppleSSO =
    NitroModules.createHybridObject<AppleAuthSpec>('AppleAuth')