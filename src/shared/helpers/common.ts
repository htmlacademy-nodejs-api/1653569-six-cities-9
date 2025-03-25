import { ClassConstructor, plainToInstance } from 'class-transformer';

const ITEM_COUNT = {
  MIN: 0,
  MAX: 6,
} as const;

const RATIO_VALUE = 0.5;

export function generateRandomItemCount() {
  return generateRandomValue(ITEM_COUNT.MIN, ITEM_COUNT.MAX);
}

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[], isFixed: boolean = false): T[] {
  const startPosition = !isFixed ? generateRandomValue(0, items.length - 1) : ITEM_COUNT.MIN;
  const endPosition = !isFixed ? startPosition + generateRandomValue(startPosition, items.length) : ITEM_COUNT.MAX;
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomBoolean(isParam: boolean = true) {
  return isParam ? Math.random() > RATIO_VALUE : false;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return { error: message };
}
