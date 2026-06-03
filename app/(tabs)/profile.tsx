import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../stores/theme';
import { useRouter } from 'expo-router';
import i18n from '../../i18n';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { theme, setTheme } = useThemeStore();
  const router = useRouter();

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  const toggleLanguage = async () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    await i18n.changeLanguage(nextLang);
  };

  return (
    <Screen>
      <View style={{ padding: 16 }}>
        <Typography variant="h1" style={{ marginBottom: 24 }}>{t('tabs.profile')}</Typography>

        <Typography variant="h2" style={{ marginTop: 24, marginBottom: 16 }}>Settings</Typography>
        <Button title={`Theme: ${theme}`} onPress={toggleTheme} variant="secondary" style={{ marginBottom: 12 }} />
        <Button title={`Language: ${i18n.language}`} onPress={toggleLanguage} variant="secondary" style={{ marginBottom: 32 }} />

        <Button title="Sign In / Sign Up" onPress={() => router.push('/(auth)/sign-in')} />
      </View>
    </Screen>
  );
}
