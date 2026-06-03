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
      <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
        <Typography variant="h1" style={{ marginBottom: 8 }}>{t('auth.signIn')}</Typography>
        <Typography variant="body" color="textMuted" style={{ marginBottom: 32 }}>
          Welcome back to the trusted community.
        </Typography>

        <Input label={t('auth.email')} placeholder="user@example.com" keyboardType="email-address" autoCapitalize="none" />
        <Input label={t('auth.password')} placeholder="********" secureTextEntry />

        <View style={{ alignItems: 'flex-end', marginBottom: 24 }}>
          <Typography
            variant="caption"
            color="primary"
            onPress={() => router.push('/(auth)/forgot-password')}
          >
            {t('auth.forgotPassword')}
          </Typography>
        </View>

        <Button title={t('auth.signIn')} onPress={() => router.back()} />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 32 }}>
          <Typography variant="body" color="textMuted">Don't have an account? </Typography>
          <Typography
            variant="body"
            color="primary"
            style={{ fontWeight: '600' }}
            onPress={() => router.push('/(auth)/sign-up')}
          >
            {t('auth.signUp')}
          </Typography>
        </View>
      </View>
    </Screen>
  );
}
