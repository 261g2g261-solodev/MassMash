import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { EmptyState } from '../../components/EmptyState';
import { useTranslation } from 'react-i18next';

export default function InboxScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={{ padding: 24, flex: 1 }}>
        <Typography variant="h1" style={{ marginBottom: 24 }}>{t('tabs.inbox')}</Typography>
        <EmptyState
          icon="chatbubbles-outline"
          title="No Messages Yet"
          description="When you contact a seller or someone messages you, it will appear here."
        />
      </View>
    </Screen>
  );
}
