import { useInfiniteQuery } from '@tanstack/react-query';

import { getPosts } from '../../../api/posts';
import { useRootStore } from '../../../stores/root-store';

export function useFeedPosts() {
  const { sessionStore } = useRootStore();

  return useInfiniteQuery({
    queryKey: ['feed-posts', sessionStore.apiBaseUrl, sessionStore.userToken],
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam, signal }) =>
      getPosts({
        baseUrl: sessionStore.apiBaseUrl,
        token: sessionStore.userToken,
        cursor: pageParam,
        signal,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined,
  });
}
