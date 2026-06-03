import React from 'react';
import { View } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { useTranslation } from 'react-i18next';

export default function SearchScreen() {
  const { t } = useTranslation();

  return (
    <Screen>
      <View style={{ padding: 16 }}>
        <Typography variant="h1" style={{ marginBottom: 24 }}>{t('tabs.search')}</Typography>
        <Input placeholder="Search for products..." />
        <Typography variant="body" color="textMuted" style={{ marginTop: 20 }}>Categories coming soon...</Typography>
      </View>
    </Screen>
  );
}
