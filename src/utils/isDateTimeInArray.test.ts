import { DateTime } from 'luxon';
import { describe, expect, test } from 'vitest';

import { isDateTimeInArray } from './isDateTimeInArray';

// Define some sample dates and arrays for testing
const date1 = DateTime.fromISO('2021-01-01');
const date2 = DateTime.fromISO('2021-02-02');
const date3 = DateTime.fromISO('2021-03-03');
const array1 = [date1, date2, date3];
const array2 = [date2, date3];
const array3 = [date3];
const array4: DateTime[] = [];

describe('isDateTimeInArray', () => {
  test('date1 is in array1', () => {
    expect(isDateTimeInArray(date1, array1)).toBe(true);
  });

  test('date1 is not in array2', () => {
    expect(isDateTimeInArray(date1, array2)).toBe(false);
  });

  test('date2 is in array2', () => {
    expect(isDateTimeInArray(date2, array2)).toBe(true);
  });

  test('date2 is not in array3', () => {
    expect(isDateTimeInArray(date2, array3)).toBe(false);
  });

  test('date3 is in array3', () => {
    expect(isDateTimeInArray(date3, array3)).toBe(true);
  });

  test('any date is not in an empty array', () => {
    expect(isDateTimeInArray(date1, array4)).toBe(false);
  });

  test('error is thrown for invalid date', () => {
    expect(() => isDateTimeInArray('2021-01-01', array1)).toThrow(
      'Invalid date'
    );
  });

  test('error is thrown for invalid array', () => {
    expect(() => isDateTimeInArray(date1, ['2021-01-01'])).toThrow(
      'Invalid array'
    );
  });
});
