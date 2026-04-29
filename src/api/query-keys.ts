import { FeedTierFilter } from '../types/feed';

export const queryKeys = {
  feedPosts: (baseUrl: string, token: string, tierFilter: FeedTierFilter) =>
    ['feed-posts', baseUrl, token, tierFilter] as const,
  postDetail: (baseUrl: string, token: string, postId: string) =>
    ['post-detail', baseUrl, token, postId] as const,
  postComments: (baseUrl: string, token: string, postId: string) =>
    ['post-comments', baseUrl, token, postId] as const,
};
