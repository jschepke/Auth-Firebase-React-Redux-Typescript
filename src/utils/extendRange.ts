import { DateTime, DurationUnit } from 'luxon';

import { ValidationError } from './errorUtils';
import { isNumber } from './isNumber';
import { isValidDateTimeArray } from './isValidDateTimeArray';
import { isValidTimeUnit } from './isValidTimeUnit';

/**
 * Options for `extendRange` function.
 */
interface ExtendRangeOptions {
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

  // validate startOffset value
  if (!isNumber(startOffset) || (isNumber(startOffset) && startOffset < 0)) {
    throw new ValidationError(
      'startOffset',
      startOffset,
      `a valid number >= 0`
    );
  }

  // validate endOffset value
  if (!isNumber(endOffset) || (isNumber(endOffset) && endOffset < 0)) {
    throw new ValidationError('endOffset', endOffset, `a valid number >= 0`);
  }

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
