import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function SignInScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <Typography variant="h1" style={{ marginBottom: 32 }}>{t('auth.signIn')}</Typography>
        <Input label={t('auth.email')} placeholder="user@example.com" keyboardType="email-address" autoCapitalize="none" />
        <Input label={t('auth.password')} placeholder="********" secureTextEntry />
        <Button title={t('auth.signIn')} onPress={() => router.back()} style={{ marginTop: 24 }} />
        <Button title={t('auth.signUp')} onPress={() => router.push('/(auth)/sign-up')} variant="outline" style={{ marginTop: 16 }} />
      </View>
    </Screen>
  );
}
