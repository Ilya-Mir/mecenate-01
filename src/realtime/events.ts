import { Comment } from '../types/api';

export type RealtimeEvent =
  | { type: 'ping' }
  | { type: 'like_updated'; postId: string; likesCount: number }
  | { type: 'comment_added'; postId: string; comment: Comment };

export function isRealtimeEvent(value: unknown): value is RealtimeEvent {
  if (!value || typeof value !== 'object' || !('type' in value)) {
    return false;
  }

  const event = value as Partial<RealtimeEvent>;

  if (event.type === 'ping') {
    return true;
  }

  if (event.type === 'like_updated') {
    return (
      typeof (event as { postId?: unknown }).postId === 'string' &&
      typeof (event as { likesCount?: unknown }).likesCount === 'number'
    );
  }

  if (event.type === 'comment_added') {
    return (
      typeof (event as { postId?: unknown }).postId === 'string' &&
      Boolean((event as { comment?: unknown }).comment)
    );
  }

  return false;
}
