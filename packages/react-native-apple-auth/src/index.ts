export * from './specs/apple-auth.nitro'
import { NitroModules } from 'react-native-nitro-modules'
import type {
  AppleAuthOptions,
  AppleAuth as AppleAuthSpec,
} from './specs/apple-auth.nitro'

const AppleAuth = NitroModules.createHybridObject<AppleAuthSpec>('AppleAuth')

class AppleAuthError extends Error {
  code: string
  constructor(message: string, code: string, name: string) {
    super(message, {
      cause: '',
    })
    this.code = code
    this.name = name
  }
}

export const RNAppleAuth = {
  signIn: async (options: AppleAuthOptions) => {
    try {
      return await AppleAuth.signIn(options)
    } catch (error) {
      const values = extractError(error as Error)
      throw new AppleAuthError(values.message, values.code, values.domain)
    }
  },
}

function extractError(e: Error) {
  const [_, domain, code] = e.message?.split(' ')

  return {
    message: 'Auth Failed', //TODO: use the error description once implemented
    code: code?.split('=')?.[1] as string,
    domain: domain?.split('=')?.[1] as string,
  }
}
