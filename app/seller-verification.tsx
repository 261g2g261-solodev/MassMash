import React from 'react';
import { View } from 'react-native';
import { Screen } from '../components/Screen';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

export default function SellerVerificationScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Screen>
      <View style={{ padding: 16 }}>
        <Typography variant="h1" style={{ marginBottom: 24 }}>{t('sell.becomeSeller')}</Typography>
        <Typography variant="body" color="textMuted" style={{ marginBottom: 24 }}>
          To ensure a safe community, we verify all our sellers. Please provide the following details.
        </Typography>

        <Input label={t('sell.legalName')} placeholder="John Doe" />
        <Input label={t('sell.phone')} placeholder="+971 50 123 4567" keyboardType="phone-pad" />
        <Input label={t('sell.city')} placeholder="Dubai" />
        <Input label={t('sell.postalCode')} placeholder="00000" />

        <Button
          title={t('sell.submit')}
          onPress={() => {
            // Mock submit
            router.back();
          }}
          style={{ marginTop: 24 }}
        />
      </View>
    </Screen>
  );
}
