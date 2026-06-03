import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useThemeStore } from '../stores/theme';
import { Colors } from '../theme/colors';
import { useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: 'text' | 'textMuted' | 'primary' | 'error';
}

export const Typography = ({ variant = 'body', color = 'text', style, ...props }: TypographyProps) => {
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const getVariantStyles = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'caption':
        return styles.caption;
      case 'body':
      default:
        return styles.body;
    }
  };

  const getTextColor = () => {
    switch (color) {
      case 'textMuted':
        return colors.textMuted;
      case 'primary':
        return colors.primary;
      case 'error':
        return colors.error;
      case 'text':
      default:
        return colors.text;
    }
  };

  return (
    <Text
      style={[
        getVariantStyles(),
        { color: getTextColor(), textAlign: isRTL ? 'right' : 'left' },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 16,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
});
