import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { ProductCard, Product } from '../../components/ProductCard';
import { TrustBanner } from '../../components/TrustBanner';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../stores/theme';
import { Colors } from '../../theme/colors';
import { useColorScheme } from 'react-native';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'Handcrafted Wooden Table', price: 150, currency: 'USD', city: 'Dubai', image_url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=600&q=80', is_verified_seller: true },
  { id: '2', title: 'Vintage Persian Rug', price: 300, currency: 'USD', city: 'Abu Dhabi', image_url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=600&q=80' },
  { id: '3', title: 'Ceramic Vase Set', price: 45, currency: 'USD', city: 'Sharjah', image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80', is_verified_seller: true },
  { id: '4', title: 'Modern Floor Lamp', price: 80, currency: 'USD', city: 'Dubai', image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80' },
];

export default function HomeScreen() {
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];
  const { t } = useTranslation();

  return (
    <Screen scrollable={false} safeArea={true}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Typography variant="h1">{t('tabs.home')}</Typography>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location" size={16} color={colors.primary} />
              <Typography variant="body" color="primary" style={{ marginLeft: 4 }}>Dubai</Typography>
            </View>
          </View>
          <View style={[styles.profileAvatar, { backgroundColor: colors.secondary }]}>
             <Ionicons name="person" size={20} color={colors.textMuted} />
          </View>
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          <TrustBanner />
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>Categories</Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {['Electronics', 'Furniture', 'Vehicles', 'Real Estate', 'Services'].map((cat, i) => (
              <View key={i} style={[styles.categoryBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Typography variant="caption" style={{ fontWeight: '600' }}>{cat}</Typography>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>Featured Listings</Typography>
          <FlatList
            data={MOCK_PRODUCTS}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => <ProductCard product={item} />}
            contentContainerStyle={styles.list}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryBadge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
