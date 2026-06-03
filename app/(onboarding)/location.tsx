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
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        <Typography variant="h1" style={{ marginBottom: 12 }}>Where are you located?</Typography>
        <Typography variant="body" color="textMuted" style={{ marginBottom: 32 }}>
          We use this to show you relevant products and sellers in your community.
        </Typography>
        <Input label="Country" placeholder="e.g. UAE" />
        <Input label="City" placeholder="e.g. Dubai" />
        <Input label="Postal Code (Optional)" placeholder="00000" />
        <Button title="Continue" onPress={() => router.push('/(onboarding)/intent')} style={{ marginTop: 24 }} />
      </View>
    </Screen>
  );
}
