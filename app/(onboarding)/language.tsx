import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import i18n from '../../i18n';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const setLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    router.push('/(onboarding)/location');
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
        <Typography variant="h1" style={{ textAlign: 'center', marginBottom: 40 }}>
          {t('onboarding.chooseLanguage')}
        </Typography>
        <Button title="العربية" onPress={() => setLanguage('ar')} style={{ marginBottom: 16 }} />
        <Button title="English" onPress={() => setLanguage('en')} variant="secondary" />
      </View>
    </Screen>
  );
}
