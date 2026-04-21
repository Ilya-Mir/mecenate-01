import { ErrorResponse } from '../types/api';

type ApiMethod = 'GET' | 'POST';

interface ApiRequestOptions {
  baseUrl: string;
  path: string;
  token: string;
  method?: ApiMethod;
  body?: unknown;
  signal?: AbortSignal;
}

interface ApiErrorOptions {
  status: number;
  code?: string;
}

const isErrorResponse = (value: unknown): value is ErrorResponse => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return (
    'ok' in value &&
    value.ok === false &&
    'error' in value &&
    typeof value.error === 'object' &&
    value.error !== null
  );
};

const parseJsonSafely = (value: string) => {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
};

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, options: ApiErrorOptions) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status;
    this.code = options.code;
  }
}

export async function apiRequest<T>({
  baseUrl,
  path,
  token,
  method = 'GET',
  body,
  signal,
}: ApiRequestOptions): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const text = await response.text();
  const payload = text ? parseJsonSafely(text) : null;

  if (!response.ok || isErrorResponse(payload)) {
    const errorMessage =
      isErrorResponse(payload) && payload.error.message
        ? payload.error.message
        : 'Request failed';

    throw new ApiError(errorMessage, {
      status: response.status,
      code: isErrorResponse(payload) ? payload.error.code : undefined,
    });
  }

  return payload as T;
}
