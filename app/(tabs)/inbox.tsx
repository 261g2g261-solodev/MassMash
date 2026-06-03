import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { useTranslation } from 'react-i18next';

export default function InboxScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={{ padding: 16 }}>
        <Typography variant="h1" style={{ marginBottom: 24 }}>{t('tabs.inbox')}</Typography>
        <Typography variant="body" color="textMuted">No messages yet.</Typography>
      </View>
    </Screen>
  );
}
