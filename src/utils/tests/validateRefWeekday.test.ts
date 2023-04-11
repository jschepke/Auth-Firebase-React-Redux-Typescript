import { describe, expect, test } from 'vitest';

import { validateRefWeekday } from '../validateRefWeekday';

describe('validateRefWeekday', () => {
  test('should not throw an error for valid weekdays', () => {
    expect(() => validateRefWeekday(1)).not.toThrow();
    expect(() => validateRefWeekday(4)).not.toThrow();
    expect(() => validateRefWeekday(7)).not.toThrow();
  });

  test('should throw an error for invalid weekdays', () => {
    expect(() => validateRefWeekday(0)).toThrow(
      'Invalid weekday. Weekday must be number between 1 and 7'
    );
    expect(() => validateRefWeekday(8)).toThrow(
      'Invalid weekday. Weekday must be number between 1 and 7'
    );
    expect(() => validateRefWeekday('Tuesday')).toThrow(
      'Invalid weekday. Weekday must be number between 1 and 7'
    );
    expect(() => validateRefWeekday(null)).toThrow(
      'Invalid weekday. Weekday must be number between 1 and 7'
    );
    expect(() => validateRefWeekday(undefined)).toThrow(
      'Invalid weekday. Weekday must be number between 1 and 7'
    );
  });
});
