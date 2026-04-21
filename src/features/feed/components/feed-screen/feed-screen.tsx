import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { env } from '../../../../config/env';
import { useRootStore } from '../../../../stores/root-store';
import { tokens } from '../../../../theme/tokens';
import { Post } from '../../../../types/api';
import { useFeedPosts } from '../../hooks/use-feed-posts';
import { ErrorState } from '../error-state';
import { FeedCardSkeleton } from '../feed-card-skeleton';
import { NoResultsState } from '../no-results-state';
import { PostCard } from '../post-card';
import { styles } from './styles';

export const FeedScreen = observer(function FeedScreen() {
  const { likesStore } = useRootStore();
  const [uiPreview, setUiPreview] = useState<'off' | 'error' | 'no-results'>(() => {
    const preview = env.feedUiPreview;
    return preview === 'error' || preview === 'no-results' ? preview : 'off';
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isRefetching,
    refetch,
  } = useFeedPosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    likesStore.reconcile(posts);
  }, [likesStore, posts]);

  const isRefreshing = isRefetching && !isFetchingNextPage;
  const hasInitialError = Boolean(error) && posts.length === 0;
  const hasInlineError = Boolean(error) && posts.length > 0;
  const refreshControl =
    Platform.OS === 'web' ? undefined : (
      <RefreshControl
        colors={[tokens.colors.brand.primary]}
        onRefresh={() => {
          void refetch();
        }}
        progressBackgroundColor={tokens.colors.background.card}
        refreshing={isRefreshing}
        tintColor={tokens.colors.brand.primary}
      />
    );

  const leavePreview = () => {
    setUiPreview('off');
    void refetch();
  };

  if (uiPreview === 'error') {
    return (
      <SafeAreaView edges={['top']} style={styles.screen}>
        <ErrorState
          buttonLabel="Повторить"
          onRetry={leavePreview}
          title="Не удалось загрузить публикацию"
        />
      </SafeAreaView>
    );
  }

  if (uiPreview === 'no-results') {
    return (
      <SafeAreaView edges={['top']} style={styles.screen}>
        <NoResultsState onGoHome={leavePreview} />
      </SafeAreaView>
    );
  }

  if (hasInitialError) {
    return (
      <SafeAreaView edges={['top']} style={styles.screen}>
        <ErrorState
          buttonLabel="Повторить"
          onRetry={() => {
            void refetch();
          }}
          title="Не удалось загрузить публикацию"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <FlatList<Post>
        contentContainerStyle={styles.contentContainer}
        data={posts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          isPending ? (
            <View style={styles.loadingState}>
              <FeedCardSkeleton />
              <FeedCardSkeleton />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Лента пока пустая</Text>
              <Text style={styles.emptyDescription}>
                Когда авторы опубликуют новые материалы, они появятся здесь.
              </Text>
            </View>
          )
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator color={tokens.colors.brand.primary} size="small" />
            </View>
          ) : (
            <View style={styles.footerSpacer} />
          )
        }
        ListHeaderComponent={
          hasInlineError ? (
            <View style={styles.inlineError}>
              <Text style={styles.inlineErrorTitle}>
                Не удалось загрузить публикации
              </Text>
              <Text style={styles.inlineErrorText}>
                Уже загруженные карточки сохранены. Потяните список вниз или
                попробуйте еще раз позже.
              </Text>
            </View>
          ) : null
        }
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.35}
        refreshControl={refreshControl}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
});
