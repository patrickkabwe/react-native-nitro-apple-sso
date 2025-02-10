import {
  AppleAuth,
  AppleAuthCredential,
  AppleAuthScopes,
} from '@kazion/react-native-apple-auth';
import React, {useState} from 'react';
import {Button, SafeAreaView, Text} from 'react-native';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<AppleAuthCredential | null>(
    null,
  );

  const handleAppleSignin = async () => {
    setLoading(true);
    try {
      const appleAuthCredential = await AppleAuth.signIn({
        scopes: [AppleAuthScopes.EMAIL, AppleAuthScopes.FULL_NAME],
      });
      setCredentials(appleAuthCredential);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Apple Auth With Nitro Modules</Text>
      <Text>Email: {credentials?.email ?? 'No Email'}</Text>
      <Text>Full Name: {credentials?.fullName ?? 'No Full Name'}</Text>
      <Text>User: {credentials?.user ?? 'No User'}</Text>
      <Button
        title={loading ? 'Loading...' : 'Sign in with Apple'}
        onPress={handleAppleSignin}
      />
    </SafeAreaView>
  );
};

export default App;
