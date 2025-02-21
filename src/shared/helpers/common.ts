const ItemCount = {
  MIN: 0,
  MAX: 6,
} as const;

const RATIO_VALUE = 0.5;

export function generateRandomItemCount() {
  return generateRandomValue(ItemCount.MIN, ItemCount.MAX);
}

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], isFixed: boolean = false): T[] {
  const startPosition = !isFixed ? generateRandomValue(0, items.length - 1) : ItemCount.MIN;
  const endPosition = !isFixed ? startPosition + generateRandomValue(startPosition, items.length) : ItemCount.MAX;
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomBoolean() {
  return Math.random() > RATIO_VALUE;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
