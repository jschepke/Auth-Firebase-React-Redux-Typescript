import { DateTime, DurationUnit } from 'luxon';

import { ValidationError } from '../errorUtils';
import { isNumber } from '../isNumber';
import { isValidDateTimeArray } from '../isValidDateTimeArray';
import { isValidTimeUnit } from '../isValidTimeUnit';

// Todo extract all validations for ExtendRangeOptions into separate function
export function validateOffset(name: string, value: unknown) {
  // if the value is not a number or is negative, throw an error
  if (!isNumber(value) || (isNumber(value) && value < 0)) {
    throw new ValidationError(name, value, `a valid number >= 0`);
  }
}

/**
 * Options for `extendRange` function.
 */
export interface ExtendRangeOptions {
  /**
   * The range of DateTime objects to extend.
   */
  rangeToExtend: DateTime[];
  /**
   * The unit of time to use for extending the range.
   *
   * @example 'days', 'months' etc.
   */
  timeUnit: DurationUnit;
  /**
   * The number of units to add to the start of the range.
   */
  startOffset: number;
  /**
   * The number of units to add to the end of the range.
   */
  endOffset: number;
}

/**
 * A function that extends an array of dates from DateRange.
 *
 * Works by adding or subtracting a specified number of units of time to the
 * start or end of the range.
 *
 * @param options - The {@link ExtendRangeOptions} for extending the range.
 * @returns A new array of DateTime objects that represents the extended range.
 * @throws ValidationError - If any of the options are invalid.
 */
export function extendRange(options: ExtendRangeOptions): DateTime[] {
  const { rangeToExtend, timeUnit, endOffset, startOffset } = options;

  //validation of input options

  // validate rangeToExtend value
  if (!isValidDateTimeArray(rangeToExtend)) {
    throw new ValidationError(
      'rangeToExtend',
      rangeToExtend,
      'array of DateTime'
    );
  }

  // validate offsets
  Object.entries({ startOffset, endOffset }).forEach(([name, value]) => {
    validateOffset(name, value);
  });

  // validate timeUnit value
  if (!isValidTimeUnit(timeUnit)) {
    throw new ValidationError(
      'timeUnit',
      timeUnit,
      'a string that is a DurationUnit',
      'DurationUnit is a string that represents a unit of time, such as "years", "months", "days", etc.`'
    );
  }

  // extend the range
  const extendedRange = [...rangeToExtend];
  const firstDate = extendedRange[0];
  const lastDate = extendedRange[extendedRange.length - 1];

  for (let i = 1; i > 0 && i <= startOffset; i++) {
    const newDate = firstDate.minus({ [timeUnit]: i });
    extendedRange.unshift(newDate);
  }
  for (let i = 1; i > 0 && i <= endOffset; i++) {
    const newDate = lastDate.plus({ [timeUnit]: i });
    extendedRange.push(newDate);
  }

  return extendedRange;
}
