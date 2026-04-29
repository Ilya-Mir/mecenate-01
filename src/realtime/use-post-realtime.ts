import { InfiniteData, QueryClient, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { queryKeys } from '../api/query-keys';
import { useRootStore } from '../stores/root-store';
import { CommentsPage, Post, PostsPage } from '../types/api';
import { FeedTierFilter } from '../types/feed';
import { isRealtimeEvent, RealtimeEvent } from './events';
import { createRealtimeUrl } from './ws-url';

const FEED_FILTERS: FeedTierFilter[] = ['all', 'free', 'paid'];

function parseEvent(data: string): RealtimeEvent | null {
  try {
    const payload = JSON.parse(data) as unknown;
    return isRealtimeEvent(payload) ? payload : null;
  } catch {
    return null;
  }
}

function updatePostInPages(
  data: InfiniteData<PostsPage> | undefined,
  postId: string,
  updatePost: (post: Post) => Post,
) {
  if (!data) {
    return data;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      posts: page.posts.map((post) =>
        post.id === postId ? updatePost(post) : post,
      ),
    })),
  };
}

function updateLikeCount(queryClient: QueryClient, options: {
  baseUrl: string;
  token: string;
  postId: string;
  likesCount: number;
}) {
  const updatePost = (post: Post): Post => ({
    ...post,
    likesCount: options.likesCount,
  });

  queryClient.setQueryData<Post | undefined>(
    queryKeys.postDetail(options.baseUrl, options.token, options.postId),
    (post) => (post ? updatePost(post) : post),
  );

  FEED_FILTERS.forEach((tierFilter) => {
    queryClient.setQueryData<InfiniteData<PostsPage> | undefined>(
      queryKeys.feedPosts(options.baseUrl, options.token, tierFilter),
      (data) => updatePostInPages(data, options.postId, updatePost),
    );
  });
}

function prependComment(queryClient: QueryClient, options: {
  baseUrl: string;
  token: string;
  postId: string;
  comment: CommentsPage['comments'][number];
}) {
  let shouldIncrementCount = true;

  queryClient.setQueryData<InfiniteData<CommentsPage> | undefined>(
    queryKeys.postComments(options.baseUrl, options.token, options.postId),
    (data) => {
      if (!data) {
        return {
          pageParams: [undefined],
          pages: [
            {
              comments: [options.comment],
              hasMore: false,
              nextCursor: null,
            },
          ],
        };
      }

      const alreadyExists = data.pages.some((page) =>
        page.comments.some((comment) => comment.id === options.comment.id),
      );

      if (alreadyExists) {
        shouldIncrementCount = false;
        return data;
      }

      const [firstPage, ...restPages] = data.pages;

      if (!firstPage) {
        return data;
      }

      return {
        ...data,
        pages: [
          {
            ...firstPage,
            comments: [
              options.comment,
              ...firstPage.comments.filter((c) => c.id !== options.comment.id),
            ],
          },
          ...restPages,
        ],
      };
    },
  );

  if (!shouldIncrementCount) {
    return;
  }

  const incrementComments = (post: Post): Post => ({
    ...post,
    commentsCount: post.commentsCount + 1,
  });

  queryClient.setQueryData<Post | undefined>(
    queryKeys.postDetail(options.baseUrl, options.token, options.postId),
    (post) => (post ? incrementComments(post) : post),
  );

  FEED_FILTERS.forEach((tierFilter) => {
    queryClient.setQueryData<InfiniteData<PostsPage> | undefined>(
      queryKeys.feedPosts(options.baseUrl, options.token, tierFilter),
      (data) => updatePostInPages(data, options.postId, incrementComments),
    );
  });
}

const WS_BASE_RECONNECT_MS = 1500;
const WS_MAX_RECONNECT_MS = 30_000;
const WS_MAX_BACKOFF_EXPONENT = 8;

export function usePostRealtime(postId: string) {
  const queryClient = useQueryClient();
  const { likesStore, sessionStore } = useRootStore();

  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let socket: WebSocket | undefined;
    let shouldReconnect = true;
    let reconnectAttempt = 0;

    const clearReconnectTimer = () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = undefined;
      }
    };

    const scheduleReconnect = () => {
      if (!shouldReconnect) {
        return;
      }

      clearReconnectTimer();

      const exponent = Math.min(reconnectAttempt, WS_MAX_BACKOFF_EXPONENT);
      const backoff = Math.min(WS_MAX_RECONNECT_MS, WS_BASE_RECONNECT_MS * 2 ** exponent);
      const jitter = Math.random() * 500;
      const delay = backoff + jitter;
      reconnectAttempt += 1;

      reconnectTimer = setTimeout(() => {
        reconnectTimer = undefined;
        connect();
      }, delay);
    };

    const teardownSocket = (instance: WebSocket | undefined) => {
      if (!instance) {
        return;
      }

      instance.onopen = null;
      instance.onmessage = null;
      instance.onerror = null;
      instance.onclose = null;

      if (
        instance.readyState === WebSocket.OPEN ||
        instance.readyState === WebSocket.CONNECTING
      ) {
        instance.close();
      }
    };

    const connect = () => {
      clearReconnectTimer();
      teardownSocket(socket);

      const url = createRealtimeUrl(sessionStore.apiBaseUrl, sessionStore.userToken);
      socket = new WebSocket(url);

      socket.onopen = () => {
        reconnectAttempt = 0;
      };

      socket.onmessage = (message) => {
        const event = parseEvent(String(message.data));

        if (!event || event.type === 'ping' || event.postId !== postId) {
          return;
        }

        if (event.type === 'like_updated') {
          updateLikeCount(queryClient, {
            baseUrl: sessionStore.apiBaseUrl,
            token: sessionStore.userToken,
            postId,
            likesCount: event.likesCount,
          });

          const updatedPost = queryClient.getQueryData<Post | undefined>(
            queryKeys.postDetail(sessionStore.apiBaseUrl, sessionStore.userToken, postId),
          );
          if (updatedPost) {
            likesStore.applyRealtimeCount(updatedPost, event.likesCount);
          }
        }

        if (event.type === 'comment_added') {
          prependComment(queryClient, {
            baseUrl: sessionStore.apiBaseUrl,
            token: sessionStore.userToken,
            postId,
            comment: event.comment,
          });
        }
      };

      socket.onerror = () => {
        if (socket && socket.readyState !== WebSocket.CLOSED) {
          socket.close();
        }
      };

      socket.onclose = () => {
        const closedSocket = socket;
        socket = undefined;

        if (closedSocket) {
          closedSocket.onopen = null;
          closedSocket.onmessage = null;
          closedSocket.onerror = null;
          closedSocket.onclose = null;
        }

        if (shouldReconnect) {
          scheduleReconnect();
        }
      };
    };

    connect();

    return () => {
      shouldReconnect = false;
      clearReconnectTimer();
      teardownSocket(socket);
      socket = undefined;
    };
  }, [
    likesStore,
    postId,
    queryClient,
    sessionStore.apiBaseUrl,
    sessionStore.userToken,
  ]);
}
