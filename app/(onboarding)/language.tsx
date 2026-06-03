import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import i18n from '../../i18n';

import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../stores/theme';
import { Colors } from '../../theme/colors';
import { useColorScheme } from 'react-native';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];

  const setLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    router.push('/(onboarding)/location');
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          <Ionicons name="globe-outline" size={64} color={colors.primary} style={{ marginBottom: 24 }} />
          <Typography variant="h1" style={{ textAlign: 'center', marginBottom: 12 }}>
            {t('onboarding.chooseLanguage')}
          </Typography>
          <Typography variant="body" color="textMuted" style={{ textAlign: 'center' }}>
            أهلاً بك. الرجاء اختيار لغتك المفضلة.
          </Typography>
        </View>
        <Button title="العربية" onPress={() => setLanguage('ar')} style={{ marginBottom: 16 }} />
        <Button title="English" onPress={() => setLanguage('en')} variant="secondary" />
      </View>
    </Screen>
  );
}
