import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '../../../api/posts';
import { queryKeys } from '../../../api/query-keys';
import { useRootStore } from '../../../stores/root-store';

export function usePostComments(postId: string) {
  const { sessionStore } = useRootStore();

  return useInfiniteQuery({
    queryKey: queryKeys.postComments(
      sessionStore.apiBaseUrl,
      sessionStore.userToken,
      postId,
    ),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam, signal }) =>
      getComments({
        baseUrl: sessionStore.apiBaseUrl,
        token: sessionStore.userToken,
        postId,
        cursor: pageParam,
        signal,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor ?? undefined : undefined,
  });
}
