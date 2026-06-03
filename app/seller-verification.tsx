import React from 'react';
import { View } from 'react-native';
import { Screen } from '../components/Screen';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../stores/theme';
import { Colors } from '../theme/colors';
import { useColorScheme } from 'react-native';

export default function SellerVerificationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];

  return (
    <Screen>
      <View style={{ padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.successLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="shield-checkmark" size={32} color={colors.success} />
          </View>
          <Typography variant="h1" style={{ textAlign: 'center', marginBottom: 12 }}>{t('sell.becomeSeller')}</Typography>
          <Typography variant="body" color="textMuted" style={{ textAlign: 'center' }}>
            We manually verify all sellers to ensure a safe, high-quality marketplace for our community.
          </Typography>
        </View>

        <Input label={t('sell.legalName')} placeholder="Full Name or Business Name" />
        <Input label={t('sell.phone')} placeholder="+971 50 123 4567" keyboardType="phone-pad" />
        <Input label={t('sell.city')} placeholder="e.g. Dubai" />
        <Input label={t('sell.postalCode')} placeholder="00000" />

        <View style={{ padding: 16, backgroundColor: colors.secondary, borderRadius: 12, marginTop: 12, marginBottom: 32 }}>
          <Typography variant="caption" color="textMuted" style={{ textAlign: 'center' }}>
            By submitting, you agree to our Terms of Service and Seller Guidelines.
          </Typography>
        </View>

        <Button
          title={t('sell.submit')}
          onPress={() => {
            // Mock submit
            router.back();
          }}
        />
      </View>
    </Screen>
  );
}
