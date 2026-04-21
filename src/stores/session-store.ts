import { makeAutoObservable } from 'mobx';

import { env } from '../config/env';

export class SessionStore {
  apiBaseUrl = env.apiBaseUrl;
  userToken = env.userToken;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
