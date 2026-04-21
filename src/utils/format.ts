const trimDecimal = (value: number) =>
  Number.isInteger(value) ? String(value) : value.toFixed(1).replace('.0', '');

export function formatCompactCount(value: number) {
  if (value >= 1_000_000) {
    return `${trimDecimal(value / 1_000_000)}M`;
  }

  if (value >= 1_000) {
    return `${trimDecimal(value / 1_000)}K`;
  }

  return String(value);
}
