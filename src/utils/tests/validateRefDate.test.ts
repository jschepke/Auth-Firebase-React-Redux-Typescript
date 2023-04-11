import { DateTime } from 'luxon';
import { describe, expect, test } from 'vitest';

import { validateRefDate } from '../validateRefDate';

describe('validateRefDate', () => {
  test('should throw an error for invalid Date or DateTime objects or other types of values', () => {
    const invalidDate = new Date('invalid');
    const invalidDateTime = DateTime.invalid('invalid'); // DateTime is from luxon lib
    const values = [null, undefined, 'string', 123, true, {}, []];
    expect(() => validateRefDate(invalidDate)).toThrow(Error);
    expect(() => validateRefDate(invalidDateTime)).toThrow(Error);
    for (const value of values) {
      expect(() => validateRefDate(value)).toThrow(Error);
    }
  });

  test('should not throw an error for valid Date or DateTime objects', () => {
    const date = new Date();
    const dateTime = DateTime.local(); // DateTime is from luxon lib
    expect(() => validateRefDate(date)).not.toThrow();
    expect(() => validateRefDate(dateTime)).not.toThrow();
  });
});
