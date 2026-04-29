import { apiRequest } from './client';
import {
  CommentCreatedResponse,
  CommentsPage,
  CommentsResponse,
  LikeResponse,
  Post,
  PostDetailResponse,
  PostsPage,
  PostsResponse,
  Tier,
} from '../types/api';

const POSTS_LIMIT = 10;
const COMMENTS_LIMIT = 20;

interface GetPostsOptions {
  baseUrl: string;
  token: string;
  tier?: Tier;
  cursor?: string;
  signal?: AbortSignal;
}

interface ToggleLikeOptions {
  baseUrl: string;
  token: string;
  postId: string;
}

interface GetPostOptions {
  baseUrl: string;
  token: string;
  postId: string;
  signal?: AbortSignal;
}

interface GetCommentsOptions extends GetPostOptions {
  cursor?: string;
}

interface AddCommentOptions extends GetPostOptions {
  text: string;
}

export async function getPosts({
  baseUrl,
  token,
  tier,
  cursor,
  signal,
}: GetPostsOptions): Promise<PostsPage> {
  const queryParts = [`limit=${POSTS_LIMIT}`];

  if (tier) {
    queryParts.push(`tier=${encodeURIComponent(tier)}`);
  }

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

export async function getPost({
  baseUrl,
  token,
  postId,
  signal,
}: GetPostOptions): Promise<Post> {
  const response = await apiRequest<PostDetailResponse>({
    baseUrl,
    path: `/posts/${encodeURIComponent(postId)}`,
    token,
    signal,
  });

  return response.data.post;
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

export async function getComments({
  baseUrl,
  token,
  postId,
  cursor,
  signal,
}: GetCommentsOptions): Promise<CommentsPage> {
  const queryParts = [`limit=${COMMENTS_LIMIT}`];

  if (cursor) {
    queryParts.push(`cursor=${encodeURIComponent(cursor)}`);
  }

  const response = await apiRequest<CommentsResponse>({
    baseUrl,
    path: `/posts/${encodeURIComponent(postId)}/comments?${queryParts.join('&')}`,
    token,
    signal,
  });

  return response.data;
}

export async function addComment({
  baseUrl,
  token,
  postId,
  text,
}: AddCommentOptions) {
  const response = await apiRequest<CommentCreatedResponse>({
    baseUrl,
    path: `/posts/${encodeURIComponent(postId)}/comments`,
    token,
    method: 'POST',
    body: { text },
  });

  return response.data.comment;
}
