import { DurationUnit } from 'luxon';
import { describe, expect, test } from 'vitest';

import { isValidTimeUnit } from '../isValidTimeUnit';

const durationUnitKeys: DurationUnit[] = [
  'day',
  'days',
  'hour',
  'hours',
  'millisecond',
  'milliseconds',
  'minute',
  'minutes',
  'month',
  'months',
  'quarter',
  'quarters',
  'second',
  'seconds',
  'week',
  'weeks',
  'year',
  'years',
];

describe('isValidTimeUnit', () => {
  // test valid time units
  test.each(durationUnitKeys)(
    'should return true for valid time unit %s',
    (timeUnit) => {
      // expect the function to return true
      expect(isValidTimeUnit(timeUnit)).toBe(true);
    }
  );

  // test invalid time units
  test.each(['foo', 'bar', 'baz', '', null, undefined])(
    'should return false for invalid time unit %s',
    (timeUnit) => {
      // expect the function to return false
      expect(isValidTimeUnit(timeUnit)).toBe(false);
    }
  );
});
