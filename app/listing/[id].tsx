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
    description: 'Beautiful handcrafted wooden table made from reclaimed oak. Perfect for a rustic dining room setup. Minor wear and tear but overall in excellent condition. Please message if you want to negotiate.',
    image_url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'Ahmad Furniture',
      rating: 4.8,
      verified: true
    }
  };

  return (
    <Screen safeArea={false}>
      <Image source={{ uri: product.image_url }} style={styles.image} />
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Typography variant="h1" style={{ flex: 1, marginBottom: 8 }}>{product.title}</Typography>
        </View>

        <Typography variant="h2" color="primary" style={{ marginBottom: 16 }}>{product.price} {product.currency}</Typography>

        <View style={[styles.sellerCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Typography variant="body" style={{ fontWeight: '600', marginRight: 8 }}>{product.seller.name}</Typography>
              {product.seller.verified && (
                <View style={{ backgroundColor: colors.successLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
                  <Typography variant="caption" style={{ color: colors.success, fontSize: 10 }}>Verified Seller</Typography>
                </View>
              )}
            </View>
            <Typography variant="caption" color="textMuted">
              ⭐ {product.seller.rating} • Based in {product.city}
            </Typography>
          </View>
        </View>

        <Typography variant="h3" style={{ marginBottom: 12 }}>Description</Typography>
        <Typography variant="body" style={{ marginBottom: 32, lineHeight: 26 }}>{product.description}</Typography>

        <View style={styles.actions}>
          <Button title="Message Seller" onPress={() => {}} style={{ flex: 2, marginRight: 8 }} />
          <Button title="Report" variant="outline" onPress={() => {}} style={{ flex: 1, marginLeft: 8 }} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 360,
  },
  content: {
    flex: 1,
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sellerCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 32,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
