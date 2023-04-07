import { DateTime } from 'luxon';
import { expect, test } from 'vitest';

import {
  getRandomDateTimes,
  RandomDateTimesOptions,
} from './getRandomDateTimes';

// Define some sample dates and ranges for testing
const date1 = DateTime.fromISO('2021-01-01');
const date2 = DateTime.fromISO('2021-02-02');
const date3 = DateTime.fromISO('2021-03-03');
const range1 = { start: date1, end: date3 };
const range2 = { start: date2, end: date3 };
const range3 = { start: date3, end: date3 };

// Write a helper function to check if a date is within a range
function isDateInRange(date: DateTime, range: RandomDateTimesOptions): boolean {
  return (
    date >= (range.start ?? DateTime.fromMillis(0)) &&
    date <= (range.end ?? DateTime.fromISO('2100-12-31'))
  );
}

// Write some test cases using expect and toBe
test('getRandomDateTimes returns an array of dates', () => {
  const result = getRandomDateTimes();
  expect(Array.isArray(result)).toBe(true);
  expect(result.every((date) => DateTime.isDateTime(date))).toBe(true);
});

test('getRandomDateTimes returns an array of the specified length', () => {
  const result = getRandomDateTimes({ count: 5 });
  expect(result.length).toBe(5);
});

test('getRandomDateTimes returns an array of dates within the specified range', () => {
  const result1 = getRandomDateTimes(range1);
  const result2 = getRandomDateTimes(range2);
  const result3 = getRandomDateTimes(range3);
  expect(result1.every((date) => isDateInRange(date, range1))).toBe(true);
  expect(result2.every((date) => isDateInRange(date, range2))).toBe(true);
  expect(result3.every((date) => isDateInRange(date, range3))).toBe(true);
});

test('getRandomDateTimes returns an array of dates within the default range', () => {
  const result = getRandomDateTimes();
  expect(
    result.every((date) =>
      isDateInRange(date, {
        start: DateTime.fromMillis(0),
        end: DateTime.fromISO('2100-12-31'),
      })
    )
  ).toBe(true);
});

test('error is thrown for invalid count', () => {
  expect(() => getRandomDateTimes({ count: -1 })).toThrow(
    'Count must be positive'
  );
});

test('error is thrown for invalid start or end date', () => {
  expect(() => getRandomDateTimes({ start: '2021-01-01' })).toThrow(
    'Invalid start or end date'
  );
});

test('error is thrown for start date after end date', () => {
  expect(() => getRandomDateTimes({ start: date3, end: date1 })).toThrow(
    'Start date must be before or equal to end date'
  );
});
