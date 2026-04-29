import { makeAutoObservable, observable } from 'mobx';

import { Post } from '../types/api';

export interface LikeSnapshot {
  isLiked: boolean;
  likesCount: number;
  isPending: boolean;
}

export class LikesStore {
  likesByPostId = observable.map<string, LikeSnapshot>({}, { deep: false });

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getSnapshot(post: Pick<Post, 'id' | 'isLiked' | 'likesCount'>): LikeSnapshot {
    return (
      this.likesByPostId.get(post.id) ?? {
        isLiked: post.isLiked,
        likesCount: post.likesCount,
        isPending: false,
      }
    );
  }

  setSnapshot(postId: string, snapshot: LikeSnapshot) {
    this.likesByPostId.set(postId, snapshot);
  }

  applyRealtimeCount(
    post: Pick<Post, 'id' | 'isLiked' | 'likesCount'>,
    likesCount: number,
  ) {
    const localSnapshot = this.getSnapshot(post);

    this.likesByPostId.set(post.id, {
      ...localSnapshot,
      likesCount,
      isPending: false,
    });
  }

  clear(postId: string) {
    this.likesByPostId.delete(postId);
  }

  reconcile(posts: Post[]) {
    posts.forEach((post) => {
      const localSnapshot = this.likesByPostId.get(post.id);

      if (!localSnapshot || localSnapshot.isPending) {
        return;
      }

      if (
        localSnapshot.isLiked === post.isLiked &&
        localSnapshot.likesCount === post.likesCount
      ) {
        this.likesByPostId.delete(post.id);
      }
    });
  }
}
