import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { LikesStore } from './likes-store';
import { SessionStore } from './session-store';

class RootStore {
  sessionStore = new SessionStore();
  likesStore = new LikesStore();
}

const RootStoreContext = createContext<RootStore | null>(null);

export function RootStoreProvider({ children }: PropsWithChildren) {
  const [rootStore] = useState(() => new RootStore());

  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}

export function useRootStore() {
  const rootStore = useContext(RootStoreContext);

  if (!rootStore) {
    throw new Error('Root store is not available');
  }

  return rootStore;
}
