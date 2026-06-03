import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from './Typography';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../stores/theme';
import { Colors } from '../theme/colors';
import { useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';

export const TrustBanner = () => {
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.successLight, borderColor: colors.success },
      isRTL && { flexDirection: 'row-reverse' }
    ]}>
      <Ionicons
        name="shield-checkmark"
        size={24}
        color={colors.success}
        style={isRTL ? { marginLeft: 12 } : { marginRight: 12 }}
      />
      <View style={styles.textContainer}>
        <Typography variant="body" style={{ color: colors.success, fontWeight: '600', marginBottom: 2 }}>
          Trusted Marketplace
        </Typography>
        <Typography variant="caption" style={{ color: colors.success }}>
          Sellers are verified for your safety.
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
  textContainer: {
    flex: 1,
  },
});
