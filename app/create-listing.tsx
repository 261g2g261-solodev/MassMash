import React from 'react';
import { View } from 'react-native';
import { Screen } from '../components/Screen';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useRouter } from 'expo-router';

export default function CreateListingScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={{ padding: 16 }}>
        <Typography variant="h1" style={{ marginBottom: 24 }}>Create Listing</Typography>

        <Input label="Title" placeholder="What are you selling?" />
        <Input label="Price" placeholder="0.00" keyboardType="numeric" />
        <Input label="Description" placeholder="Describe your item..." multiline numberOfLines={4} style={{ height: 100 }} />
        <Input label="City" placeholder="e.g. Dubai" />

        <Button
          title="Publish Listing"
          onPress={() => {
            // Mock publish
            router.back();
          }}
          style={{ marginTop: 24 }}
        />
      </View>
    </Screen>
  );
}
