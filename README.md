# @kazion/react-native-apple-auth

A React Native module for Apple Sign In Built with Nitro Modules.

[![Build Android](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/android-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/android-build.yml)
[![Build iOS](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/ios-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/ios-build.yml)
[![npm version](https://img.shields.io/npm/v/@kazion/react-native-apple-auth.svg?style=flat-square)](https://www.npmjs.com/package/@kazion/react-native-apple-auth)
[![npm downloads](https://img.shields.io/npm/dm/@kazion/react-native-apple-auth.svg?style=flat-square)](https://www.npmjs.com/package/@kazion/react-native-apple-auth)

## Features

- Native Apple Sign In implementation
- Smooth user experience with iOS design guidelines
- Optimized performance using native modules

## Requirements

- React Native v0.76.0 or higher
- Node 18.0.0 or higher

## Installation

```bash
# Install the module
bun add @kazion/react-native-apple-auth react-native-nitro-modules

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

## Credits

Bootstrapped with [create-nitro-module](https://github.com/patrickkabwe/create-nitro-module).


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
