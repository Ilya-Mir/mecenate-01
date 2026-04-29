export function createRealtimeUrl(baseUrl: string, token: string) {
  const wsBaseUrl = baseUrl
    .replace(/^https:\/\//, 'wss://')
    .replace(/^http:\/\//, 'ws://')
    .replace(/\/+$/, '');

  return `${wsBaseUrl}/ws?token=${encodeURIComponent(token)}`;
}
