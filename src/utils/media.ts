export function canRenderRemoteImage(url?: string | null) {
  if (!url) {
    return false;
  }

  return !url.toLowerCase().endsWith('.webm');
}

export function getInitials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((chunk) => chunk[0] ?? '')
    .join('')
    .toUpperCase();
}
