import { apiRequest } from './client';
import { LikeResponse, PostsPage, PostsResponse } from '../types/api';

const POSTS_LIMIT = 10;

interface GetPostsOptions {
  baseUrl: string;
  token: string;
  cursor?: string;
  signal?: AbortSignal;
}

interface ToggleLikeOptions {
  baseUrl: string;
  token: string;
  postId: string;
}

export async function getPosts({
  baseUrl,
  token,
  cursor,
  signal,
}: GetPostsOptions): Promise<PostsPage> {
  const queryParts = [`limit=${POSTS_LIMIT}`];

  if (cursor) {
    queryParts.push(`cursor=${encodeURIComponent(cursor)}`);
  }

  const response = await apiRequest<PostsResponse>({
    baseUrl,
    path: `/posts?${queryParts.join('&')}`,
    token,
    signal,
  });

  return response.data;
}

export async function toggleLike({
  baseUrl,
  token,
  postId,
}: ToggleLikeOptions) {
  const response = await apiRequest<LikeResponse>({
    baseUrl,
    path: `/posts/${encodeURIComponent(postId)}/like`,
    token,
    method: 'POST',
  });

  return response.data;
}
