import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FeedScreen } from './src/features/feed/components';
import { PostDetailScreen } from './src/features/post-detail/components';
import { RootStoreProvider } from './src/stores/root-store';
import { manropeFontMap } from './src/theme/tokens';

export default function App() {
  useFonts(manropeFontMap);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <SafeAreaProvider>
      <RootStoreProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          {selectedPostId ? (
            <PostDetailScreen
              onBack={() => setSelectedPostId(null)}
              postId={selectedPostId}
            />
          ) : (
            <FeedScreen onOpenPost={setSelectedPostId} />
          )}
        </QueryClientProvider>
      </RootStoreProvider>
    </SafeAreaProvider>
  );
}
