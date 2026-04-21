export type Tier = 'free' | 'paid';

export interface Author {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  subscribersCount: number;
  isVerified: boolean;
}

export interface Post {
  id: string;
  author: Author;
  title: string;
  body: string;
  preview: string;
  coverUrl: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  tier: Tier;
  createdAt: string;
}

export interface PostsPage {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PostsResponse {
  ok: true;
  data: PostsPage;
}

export interface LikeResponse {
  ok: true;
  data: {
    isLiked: boolean;
    likesCount: number;
  };
}

export interface ErrorResponse {
  ok: false;
  error: {
    code: string;
    message: string;
  };
}
