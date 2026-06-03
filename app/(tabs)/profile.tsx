import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '../../stores/theme';
import { Colors } from '../../theme/colors';
import { useColorScheme } from 'react-native';
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

  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];

  return (
    <Screen>
      <View style={{ padding: 24 }}>
        <Typography variant="h1" style={{ marginBottom: 32 }}>{t('tabs.profile')}</Typography>

        <View style={{ padding: 24, backgroundColor: colors.surface, borderRadius: 16, marginBottom: 32, alignItems: 'center', borderWidth: 1, borderColor: colors.border }}>
          <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.secondary, marginBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h2" color="textMuted">?</Typography>
          </View>
          <Typography variant="h3" style={{ marginBottom: 8 }}>Guest User</Typography>
          <Typography variant="body" color="textMuted" style={{ marginBottom: 24 }}>Sign in to manage your listings</Typography>
          <Button title="Sign In / Sign Up" onPress={() => router.push('/(auth)/sign-in')} style={{ width: '100%' }} />
        </View>

        <Typography variant="h2" style={{ marginBottom: 16 }}>Settings</Typography>
        <Button title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`} onPress={toggleTheme} variant="secondary" style={{ marginBottom: 12 }} />
        <Button title={`Language: ${i18n.language === 'en' ? 'English' : 'العربية'}`} onPress={toggleLanguage} variant="secondary" style={{ marginBottom: 32 }} />
      </View>
    </Screen>
  );
}
