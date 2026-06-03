import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useRouter } from 'expo-router';

export default function LocationScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Typography variant="h1" style={{ marginBottom: 24 }}>Where are you located?</Typography>
        <Input label="Country" placeholder="e.g. UAE" />
        <Input label="City" placeholder="e.g. Dubai" />
        <Button title="Continue" onPress={() => router.push('/(onboarding)/intent')} style={{ marginTop: 24 }} />
      </View>
    </Screen>
  );
}
