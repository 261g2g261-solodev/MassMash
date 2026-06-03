import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to onboarding or tabs based on initial state
  // For MVP scaffold, we'll route directly to onboarding first
  return <Redirect href="/(onboarding)/language" />;
}
