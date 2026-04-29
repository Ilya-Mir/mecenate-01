# Mecenate Feed Test

Тестовое приложение на `React Native + Expo` для iOS/Android, собранное строго по стеку из задания:

- `TypeScript`
- `React Native + Expo`
- `MobX`
- `React Query`
- стилизация через дизайн-токены

## Что реализовано

- экран feed с карточками постов
- cursor-based пагинация при скролле вниз
- `pull-to-refresh`
- таб-фильтр `Все / Бесплатные / Платные` через API-параметр `tier`
- переход по карточке на экран детальной публикации
- экран post detail с полным текстом, обложкой и автором
- lazy-load комментариев и отправка нового комментария
- real-time обновления лайков и комментариев через WebSocket
- лайк на detail-экране с `react-native-reanimated` анимацией счётчика и `expo-haptics`
- заглушка для `tier: "paid"` вместо текста публикации
- экран ошибки с сообщением `Не удалось загрузить публикацию` и кнопкой повтора
- лайк поста с optimistic UI через `MobX`
- сетевой слой поверх API `https://k8s.mectest.ru/test-app`

## Технологии

- `React Query` отвечает за server state, загрузку ленты и пагинацию
- `MobX` хранит клиентское состояние сессии и optimistic like state
- `WebSocket` подписка подключается на detail-экране по `/ws?token=<uuid>` и обновляет cache React Query
- дизайн-токены лежат в [`src/theme/tokens.ts`](./src/theme/tokens.ts)

## Переменные окружения

По умолчанию приложение использует те же значения, что и в [`.env.example`](./.env.example) (базовый URL тестового API и фиксированный UUID токена). Файл `.env` **не обязателен**: он нужен только если хотите переопределить URL или токен локально.

```env
EXPO_PUBLIC_API_BASE_URL=https://k8s.mectest.ru/test-app
EXPO_PUBLIC_API_TOKEN=550e8400-e29b-41d4-a716-446655440000
```

Переменные с префиксом `EXPO_PUBLIC_` попадают в клиентский бандл Expo, это **не** секретное хранилище. Здесь `EXPO_PUBLIC_API_TOKEN` — публичная конфигурация идентификатора запросов: backend принимает любой валидный UUID как bearer token.

WebSocket URL вычисляется из `EXPO_PUBLIC_API_BASE_URL`: для дефолтного API это `wss://k8s.mectest.ru/test-app/ws?token=<uuid>`.

### Предпросмотр экранов ошибки и «ничего не найдено»

Чтобы сверстать UI без поломки сети, в `.env` можно временно задать:

```env
EXPO_PUBLIC_FEED_UI_PREVIEW=error
```

или

```env
EXPO_PUBLIC_FEED_UI_PREVIEW=no-results
```

Перезапустите Metro (`Ctrl+C`, снова `npm start`). Экран откроется сразу в выбранном состоянии; кнопки «Повторить» / «На главную» выходят из режима предпросмотра и возвращают обычную ленту.

Без этой переменной экран ошибки показывается, если первый запрос к API не удался (например, выключен интернет или в `.env` указан неверный `EXPO_PUBLIC_API_BASE_URL`). Экран «По вашему запросу ничего не найдено» в продуктовом сценарии предназначен для поиска/фильтра; в приложении он подключается через компонент `NoResultsState` при появлении такого сценария.

## Как запустить

```bash
npm install
npm start
```

Дальше:

1. Откройте Expo Go на телефоне.
2. Отсканируйте QR-код из терминала.

Локальный запуск на симуляторах:

```bash
npm run ios
npm run android
```

## Проверки

```bash
npm run typecheck
npm run export:check
```

`export:check` делает production bundling для iOS и Android и помогает поймать runtime-проблемы до ручного запуска.

## Структура

```text
src/
  api/                 HTTP client и запросы к posts API
  config/              env-конфиг
  features/feed/       экран ленты и UI-компоненты
  features/post-detail/ экран детальной публикации, комментарии, animated like
  realtime/            WebSocket events и cache updates
  stores/              MobX stores
  theme/               foundations, component tokens и шрифты
  types/               типы API
  ui/                  реиспользуемые primitives из UI kit
  utils/               форматирование и media helpers
```
