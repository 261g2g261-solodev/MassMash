import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeStore } from '../../stores/theme';
import { Colors } from '../../theme/colors';
import { useColorScheme } from 'react-native';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];

  // Mock product data
  const product = {
    title: 'Handcrafted Wooden Table',
    price: 150,
    currency: 'USD',
    city: 'Dubai',
    description: 'Beautiful handcrafted wooden table made from reclaimed oak. Perfect for a rustic dining room setup. Minor wear and tear but overall in excellent condition.',
    image_url: 'https://via.placeholder.com/600',
  };

  return (
    <Screen safeArea={false}>
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <Typography variant="h1" style={{ marginBottom: 8 }}>{product.title}</Typography>
        <Typography variant="h2" color="primary" style={{ marginBottom: 16 }}>{product.price} {product.currency}</Typography>
        <Typography variant="caption" color="textMuted" style={{ marginBottom: 24 }}>Location: {product.city}</Typography>

        <Typography variant="h3" style={{ marginBottom: 8 }}>Description</Typography>
        <Typography variant="body" style={{ marginBottom: 32 }}>{product.description}</Typography>

        <View style={styles.actions}>
          <Button title="Message Seller" onPress={() => {}} style={{ flex: 1, marginRight: 8 }} />
          <Button title="Report" variant="outline" onPress={() => {}} style={{ flex: 1, marginLeft: 8 }} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
