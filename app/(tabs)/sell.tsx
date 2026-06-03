import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function SellScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen>
      <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h1" style={{ marginBottom: 16 }}>{t('tabs.sell')}</Typography>
        <Typography variant="body" color="textMuted" style={{ textAlign: 'center', marginBottom: 32 }}>
          Start selling your items to a trusted community.
        </Typography>
        <Button title="Create Listing" onPress={() => router.push('/create-listing')} style={{ width: '100%', marginBottom: 16 }} />
        <Button title={t('sell.becomeSeller')} onPress={() => router.push('/seller-verification')} variant="outline" style={{ width: '100%' }} />
      </View>
    </Screen>
  );
}
