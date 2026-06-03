import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useRouter } from 'expo-router';

export default function IntentScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          <Typography variant="h1" style={{ textAlign: 'center', marginBottom: 12 }}>
            What brings you here?
          </Typography>
          <Typography variant="body" color="textMuted" style={{ textAlign: 'center' }}>
            Personalize your experience. You can always change this later.
          </Typography>
        </View>
        <Button title="I want to buy" onPress={() => router.replace('/(tabs)')} style={{ marginBottom: 16 }} />
        <Button title="I want to sell" onPress={() => router.replace('/(tabs)')} variant="secondary" style={{ marginBottom: 16 }} />
        <Button title="Just browsing" onPress={() => router.replace('/(tabs)')} variant="outline" />
      </View>
    </Screen>
  );
}
