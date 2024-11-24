# react-native-apple-auth

A Simple React Native Nitro module for in-app browser.

[![Build Android](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/android-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/android-build.yml)
[![Build iOS](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/ios-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-apple-auth/actions/workflows/ios-build.yml)

[![npm version](https://img.shields.io/npm/v/react-native-apple-auth.svg?style=flat-square)](https://www.npmjs.com/package/react-native-apple-auth)
[![npm downloads](https://img.shields.io/npm/dm/react-native-apple-auth.svg?style=flat-square)](https://www.npmjs.com/package/react-native-apple-auth)

> [!WARNING]  
> This library is still under development. Use at your own risk.

## Prerequisites

- React Native 0.76 or higher
- [Nitro Modules](https://github.com/mrousavy/nitro)

```sh
bun install react-native-apple-auth react-native-nitro-modules
cd ios && pod install && cd ..
```

## Feature

[x] Supports iOS
[x] Supports Android
[x] Supports Web Support

## Usage

```js
import { useState } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import {
  AppleAuthCredential,
  AppleAuthOperation,
  AppleAuthScopes,
  RNAppleAuth,
} from 'react-native-apple-auth'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [creds, setCreds] = (useState < AppleAuthCredential) | (null > null)
  const handleAppleSignin = async () => {
    setLoading(true)
    try {
      const appleAuthCredential = await RNAppleAuth.signIn({
        operation: AppleAuthOperation.LOGIN,
        scopes: [AppleAuthScopes.EMAIL, AppleAuthScopes.FULL_NAME],
      })

      setCreds(appleAuthCredential)
    } catch (error) {
      console.log(JSON.stringify(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Apple AUth With Nitro Modules</Text>
      <Text>Email: {creds?.email ?? 'No Email'}</Text>
      <Text>Full Name: {creds?.fullName ?? 'No Full Name'}</Text>
      <Button
        title={loading ? 'Loading...' : 'Sign in with Apple'}
        onPress={handleAppleSignin}
      />
    </SafeAreaView>
  )
}

export default App
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with ❤️ by [Patrick Kabwe](https://github.com/patrickkabwe).

## Credits

This package is based on the [react-native-nitro-modules](https://github.com/mrousavy/nitro) package.
