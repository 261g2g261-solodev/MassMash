import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Typography } from './Typography';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../stores/theme';
import { Colors } from '../theme/colors';
import { useColorScheme } from 'react-native';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  loading?: boolean;
}

export const EmptyState = ({ icon, title, description, loading }: EmptyStateProps) => {
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: colors.secondary }]}>
          <Ionicons name={icon} size={48} color={colors.textMuted} />
        </View>
      )}
      <Typography variant="h3" style={{ textAlign: 'center', marginBottom: 8 }}>{title}</Typography>
      {description && (
        <Typography variant="body" color="textMuted" style={{ textAlign: 'center', maxWidth: '80%' }}>
          {description}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    minHeight: 300,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
});
