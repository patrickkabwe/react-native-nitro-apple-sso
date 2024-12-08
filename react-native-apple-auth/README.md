# react-native-apple-auth

A React Native library for Apple Sign In and Passkey authentication, built with Nitro Modules.

[![Build Android](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/android-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/android-build.yml)
[![Build iOS](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/ios-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/ios-build.yml)
[![npm version](https://img.shields.io/npm/v/@kazion/react-native-apple-auth.svg?style=flat-square)](https://www.npmjs.com/package/@kazion/react-native-apple-auth)
[![npm downloads](https://img.shields.io/npm/dm/@kazion/react-native-apple-auth.svg?style=flat-square)](https://www.npmjs.com/package/@kazion/react-native-apple-auth)

> **Warning**
> This library is currently in beta. Use in production with caution.

## Features

### ✨ Seamless iOS Integration
- Native Apple Sign In implementation
- Smooth user experience with iOS design guidelines
- Optimized performance using native modules

### 🔧 Built with Modern Architecture
- Powered by [Nitro modules](https://github.com/mrousavy/nitro) for superior performance
- Zero runtime overhead with direct swift c++ native bindings
- Type-safe API with full TypeScript support

### 🎯 Developer Experience
- Simple, promise-based API
- Improved application state integration
- Comprehensive TypeScript definitions
- Detailed error handling

### 🚀 Coming Soon
- 🚧 Android Support
- 🚧 Web Support
- 🚧 Passkey Authentication

## Requirements

- React Native ≥ 0.76
- [Nitro Modules](https://github.com/mrousavy/nitro)

## Installation

```sh
# Using bun
bun install @kazion/react-native-apple-auth react-native-nitro-modules

# Using npm
npm install @kazion/react-native-apple-auth react-native-nitro-modules

# Using yarn
yarn add @kazion/react-native-apple-auth react-native-nitro-modules

# Install iOS dependencies
cd ios && pod install && cd ..
```

## Usage

```tsx
import {
  AppleAuthCredential,
  AppleAuthScopes,
  RNAppleAuth,
} from '@kazion/react-native-apple-auth'
import { useState } from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [creds, setCreds] = useState<AppleAuthCredential | null>(null)

  const handleAppleSignIn = async () => {
    setLoading(true)
    try {
      const appleAuthCredential = await RNAppleAuth.signIn({
        scopes: [AppleAuthScopes.EMAIL, AppleAuthScopes.FULL_NAME],
      })
      setCreds(appleAuthCredential)
    } catch (error) {
      console.error('Apple Sign In failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Apple Auth Demo</Text>

        <Text>Email: {creds?.email ?? 'Not available'}</Text>
        <Text>Full Name: {creds?.fullName ?? 'Not available'}</Text>

        <Button
          title={loading ? 'Loading...' : 'Sign in with Apple'}
          onPress={handleAppleSignIn}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  )
}

export default App
```

## API Reference

### RNAppleAuth.signIn(options)

Initiates the Apple Sign In flow.

#### Options

| Parameter | Type              | Description                                  |
| --------- | ----------------- | -------------------------------------------- |
| scopes    | AppleAuthScopes[] | Array of requested scopes (EMAIL, FULL_NAME) |

#### Returns

Returns a Promise that resolves to `AppleAuthCredential`:

```typescript
interface AppleAuthCredential {
  email?: string
  fullName?: string
  // Additional fields to be documented
}
```

## Contributing

Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Setting up your development environment
- Submitting pull requests
- Our code of conduct

## License

MIT

---

Created with ❤️ by [Patrick Kabwe](https://github.com/patrickkabwe)

## Acknowledgments

This package is built on top of [react-native-nitro-modules](https://github.com/mrousavy/nitro).
