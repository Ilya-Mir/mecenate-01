/**
 * Значения по умолчанию совпадают с `.env.example`. Переменные `EXPO_PUBLIC_*`
 * встраиваются в бандл — это конфигурация среды, не место для настоящих секретов.
 */
const DEFAULT_API_BASE_URL = 'https://k8s.mectest.ru/test-app';
const DEFAULT_API_TOKEN = '550e8400-e29b-41d4-a716-446655440000';

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const feedUiPreviewRaw =
  process.env.EXPO_PUBLIC_FEED_UI_PREVIEW?.trim().toLowerCase() ?? '';
const feedUiPreview: 'error' | 'no-results' | undefined =
  feedUiPreviewRaw === 'error' || feedUiPreviewRaw === 'no-results'
    ? feedUiPreviewRaw
    : undefined;

export const env = {
  apiBaseUrl: trimTrailingSlash(
    process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL,
  ),
  userToken: process.env.EXPO_PUBLIC_API_TOKEN ?? DEFAULT_API_TOKEN,
  /** Только для проверки вёрстки: `error` | `no-results`. Не задавать в прод-сборке. */
  feedUiPreview,
};
