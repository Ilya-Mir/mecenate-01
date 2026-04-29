import { useQuery } from '@tanstack/react-query';

import { getPost } from '../../../api/posts';
import { queryKeys } from '../../../api/query-keys';
import { useRootStore } from '../../../stores/root-store';

export function usePostDetail(postId: string) {
  const { sessionStore } = useRootStore();

  return useQuery({
    queryKey: queryKeys.postDetail(
      sessionStore.apiBaseUrl,
      sessionStore.userToken,
      postId,
    ),
    queryFn: ({ signal }) =>
      getPost({
        baseUrl: sessionStore.apiBaseUrl,
        token: sessionStore.userToken,
        postId,
        signal,
      }),
  });
}
