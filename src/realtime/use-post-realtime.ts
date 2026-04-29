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
        return data;
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
            comments: [options.comment, ...firstPage.comments],
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

export function usePostRealtime(postId: string) {
  const queryClient = useQueryClient();
  const { sessionStore } = useRootStore();

  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
    let socket: WebSocket | undefined;
    let shouldReconnect = true;

    const connect = () => {
      socket = new WebSocket(
        createRealtimeUrl(sessionStore.apiBaseUrl, sessionStore.userToken),
      );

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

      socket.onclose = () => {
        if (shouldReconnect) {
          reconnectTimer = setTimeout(connect, 1500);
        }
      };
    };

    connect();

    return () => {
      shouldReconnect = false;

      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }

      socket?.close();
    };
  }, [postId, queryClient, sessionStore.apiBaseUrl, sessionStore.userToken]);
}
