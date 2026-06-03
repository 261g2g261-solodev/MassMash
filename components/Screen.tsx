import React from 'react';
import { View, StyleSheet, ScrollView, ViewProps, ScrollViewProps } from 'react-native';
import { useThemeStore } from '../stores/theme';
import { Colors } from '../theme/colors';
import { useColorScheme } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
  scrollable?: boolean;
  safeArea?: boolean;
}

export const Screen = ({ children, scrollable = true, safeArea = true, style, ...props }: ScreenProps) => {
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];

  const content = scrollable ? (
    <ScrollView contentContainerStyle={[styles.scrollContent, style]} {...props}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );

  if (safeArea) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        {content}
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
