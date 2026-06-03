import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Screen } from '../../components/Screen';
import { Typography } from '../../components/Typography';
import { ProductCard, Product } from '../../components/ProductCard';
import { useTranslation } from 'react-i18next';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'Handcrafted Wooden Table', price: 150, currency: 'USD', city: 'Dubai', image_url: 'https://via.placeholder.com/300' },
  { id: '2', title: 'Vintage Persian Rug', price: 300, currency: 'USD', city: 'Abu Dhabi', image_url: 'https://via.placeholder.com/300' },
  { id: '3', title: 'Ceramic Vase Set', price: 45, currency: 'USD', city: 'Sharjah', image_url: 'https://via.placeholder.com/300' },
  { id: '4', title: 'Modern Floor Lamp', price: 80, currency: 'USD', city: 'Dubai', image_url: 'https://via.placeholder.com/300' },
];

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <Screen scrollable={false}>
      <ScrollView>
        <View style={styles.header}>
          <Typography variant="h1">{t('tabs.home')}</Typography>
          <Typography variant="body" color="primary">Dubai (City Switcher Placeholder)</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="h2" style={styles.sectionTitle}>Categories</Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {['Electronics', 'Furniture', 'Vehicles', 'Real Estate'].map((cat, i) => (
              <View key={i} style={styles.categoryBadge}><Typography variant="caption">{cat}</Typography></View>
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
  horizontalList: {
    paddingHorizontal: 16,
  },
  categoryBadge: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});
