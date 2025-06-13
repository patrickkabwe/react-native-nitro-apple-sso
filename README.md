# react-native-nitro-apple-sso

A React Native module for Apple Sign In Built with Nitro Modules.

[![Build Android](https://github.com/patrickkabwe/react-native-nitro-apple-sso/actions/workflows/android-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-nitro-apple-sso/actions/workflows/android-build.yml)
[![Build iOS](https://github.com/patrickkabwe/react-native-nitro-apple-sso/actions/workflows/ios-build.yml/badge.svg)](https://github.com/patrickkabwe/react-native-nitro-apple-sso/actions/workflows/ios-build.yml)
[![npm version](https://img.shields.io/npm/v/react-native-nitro-apple-sso.svg?style=flat-square)](https://www.npmjs.com/package/react-native-nitro-apple-sso)
[![npm downloads](https://img.shields.io/npm/dm/react-native-nitro-apple-sso.svg?style=flat-square)](https://www.npmjs.com/package/react-native-nitro-apple-sso)

## Features

### ✨ Cross-Platform Apple Sign In

- Native Apple Sign In implementation for iOS and Android
- Smooth user experience following platform design guidelines
- Optimized performance using Nitro Modules
- Built with modern hybrid architecture (Swift for iOS, Kotlin for Android)

## Requirements

- React Native v0.76.0 or higher
- Node 18.0.0 or higher

## Installation

```bash
bun add react-native-nitro-apple-sso react-native-nitro-modules

# Install iOS dependencies
cd ios && pod install && cd ..

# For Android, the dependencies are automatically linked with autolinking
```

## Usage

```tsx
import {
    AppleAuthCredential,
    AppleAuthScopes,
    RNAppleAuth,
} from "react-native-nitro-apple-sso";
import { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

const App = () => {
    const [loading, setLoading] = useState(false);
    const [creds, setCreds] = useState<AppleAuthCredential | null>(null);

    const handleAppleSignIn = async () => {
        setLoading(true);
        try {
            const appleAuthCredential = await RNAppleAuth.signIn({
                scopes: [AppleAuthScopes.EMAIL, AppleAuthScopes.FULL_NAME],
            });
            setCreds(appleAuthCredential);
        } catch (error) {
            console.error("Apple Sign In failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>
                    Apple Auth Demo
                </Text>

                <Text>Email: {creds?.email ?? "Not available"}</Text>
                <Text>Full Name: {creds?.fullName ?? "Not available"}</Text>

                <Button
                    title={loading ? "Loading..." : "Sign in with Apple"}
                    onPress={handleAppleSignIn}
                    disabled={loading}
                />
            </View>
        </SafeAreaView>
    );
};

export default App;
```

## API Reference

### Types

#### `AppleAuthCredential`

The credential object returned after successful Apple Sign In.

| Property            | Type     | Description                                       |
| ------------------- | -------- | ------------------------------------------------- |
| `user`              | `string` | Unique identifier for the user                    |
| `email`             | `string` | User's email address (if requested and available) |
| `fullName`          | `string` | User's full name (if requested and available)     |
| `authorizationCode` | `string` | Authorization code for server-side verification   |
| `identityToken`     | `string` | JWT identity token                                |
| `state`             | `string` | State parameter for additional security           |

#### `AppleAuthOptions`

Configuration options for the sign-in request.

| Property    | Type                 | Description                           |
| ----------- | -------------------- | ------------------------------------- |
| `scopes`    | `AppleAuthScopes[]`  | Array of requested permission scopes  |
| `operation` | `AppleAuthOperation` | Type of authentication operation      |
| `nonce`     | `string`             | Random string for security validation |

#### `AppleAuthScopes`

Available permission scopes for Apple Sign In.

| Value       | Description                            |
| ----------- | -------------------------------------- |
| `FULL_NAME` | Request access to user's full name     |
| `EMAIL`     | Request access to user's email address |

#### `AppleAuthOperation`

Type of authentication operation.

| Value      | Description              |
| ---------- | ------------------------ |
| `LOGIN`    | Standard login operation |
| `LOGOUT`   | Logout operation         |
| `IMPLICIT` | Implicit authentication  |

#### `RealUserStatus`

Status indicating if the user appears to be a real person.

| Value         | Description                                   |
| ------------- | --------------------------------------------- |
| `UNSUPPORTED` | Real user status not supported on this device |
| `UNKNOWN`     | Unable to determine if user is real           |
| `LIKELY_REAL` | User appears to be a real person              |

### Methods

#### `signIn(options: AppleAuthOptions): Promise<AppleAuthCredential | null>`

Initiates Apple Sign In flow with the specified options.

**Parameters:**

- `options`: Configuration object containing scopes and optional parameters

**Returns:**

- `Promise<AppleAuthCredential | null>`: Resolves with user credentials or null if cancelled

**Example:**

```tsx
const credential = await RNAppleAuth.signIn({
    scopes: [AppleAuthScopes.EMAIL, AppleAuthScopes.FULL_NAME],
    operation: AppleAuthOperation.LOGIN,
});
```

## Credits

Bootstrapped with [create-nitro-module](https://github.com/patrickkabwe/create-nitro-module).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
