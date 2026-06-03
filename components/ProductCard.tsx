import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useThemeStore } from '../stores/theme';
import { Colors } from '../theme/colors';
import { useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  city: string;
  image_url: string;
  is_verified_seller?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { theme } = useThemeStore();
  const systemTheme = useColorScheme();
  const currentTheme = theme === 'system' ? (systemTheme || 'light') : theme;
  const colors = Colors[currentTheme as keyof typeof Colors];
  const router = useRouter();
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => router.push(`/listing/${product.id}`)}
    >
      <Image source={{ uri: product.image_url }} style={styles.image} resizeMode="cover" />

      {product.is_verified_seller && (
        <View style={[styles.verifiedBadge, { backgroundColor: colors.surface, [isRTL ? 'right' : 'left']: 8 }]}>
          <Ionicons name="shield-checkmark" size={14} color={colors.success} />
        </View>
      )}

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text, textAlign: isRTL ? 'right' : 'left' }]} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={[styles.price, { color: colors.primary, textAlign: isRTL ? 'right' : 'left' }]}>
          {product.price} {product.currency}
        </Text>
        <View style={[styles.locationRow, isRTL && { flexDirection: 'row-reverse' }]}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} style={isRTL ? { marginLeft: 4 } : { marginRight: 4 }} />
          <Text style={[styles.city, { color: colors.textMuted }]}>
            {product.city}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: '48%', // For a 2-column grid
    elevation: 2, // Soft shadow for Android
    shadowColor: '#000', // Soft shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 140,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    padding: 6,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  city: {
    fontSize: 12,
  },
});
