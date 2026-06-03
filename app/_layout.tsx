import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useThemeStore } from '../stores/theme';
import { Colors } from '../theme/colors';
import { useColorScheme, View, ActivityIndicator } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../i18n';

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [session, setSession] = useState<any>(null);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitializing(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === '(auth)';
    // NOTE: For MVP, buyer browsing works without login, so we don't strict-redirect
    // to sign-in unless accessing specific protected routes (handled in those routes)

    // As a simple onboarding flow check, if no session and not in auth/onboarding,
    // we could redirect to onboarding, but for now we'll default to tabs and
    // let the onboarding modal pop up if needed.
  }, [session, isInitializing, segments]);

  if (isInitializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
        <Stack.Screen name="listing/[id]" />
        <Stack.Screen name="seller-verification" options={{ presentation: 'modal' }} />
        <Stack.Screen name="create-listing" options={{ presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
