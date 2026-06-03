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
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Typography variant="h1" style={{ marginBottom: 40, textAlign: 'center' }}>What brings you here?</Typography>
        <Button title="I want to buy" onPress={() => router.replace('/(tabs)')} style={{ marginBottom: 16 }} />
        <Button title="I want to sell" onPress={() => router.replace('/(tabs)')} variant="secondary" />
      </View>
    </Screen>
  );
}
