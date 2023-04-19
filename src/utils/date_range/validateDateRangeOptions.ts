import { ValidationError } from '../errorUtils';
import { isEmptyObject } from '../isEmptyObject';
import { isNumber } from '../isNumber';
import { isObject } from '../isObject';
import { isValidRefDate } from '../isValidRefDate';
import { isValidWeekday } from '../isValidWeekday';
import { PropertiesMap } from '../types/utilityTypes';
import { DateRangeOptions } from './dateRange';

const dateRangeOptionsKeysMap: PropertiesMap<DateRangeOptions> = {
  endOffset: 'endOffset',
  refDate: 'refDate',
  refWeekday: 'refWeekday',
  startOffset: 'startOffset',
};

/**
 * Validates the date range options.
 *
 * Throws an error if any of the parameters are invalid.
 */
export function validateDateRangeOptions(value: unknown): void {
  const expectedProperties = Object.values(dateRangeOptionsKeysMap);

  // check if value is an object and has any properties
  if (!isObject(value) || isEmptyObject(value)) {
    throw new ValidationError(
      'options parameter',
      value,
      `an object with at least one of the following properties: ${expectedProperties.join(
        ', '
      )}`
    );
  }
  // check if value has any of the not matching properties
  const notMatchingProperties = Object.keys(value).filter(
    (prop) => !(prop in dateRangeOptionsKeysMap)
  );

  if (notMatchingProperties.length > 0) {
    throw new ValidationError(
      'options parameter',
      value,
      `an object with specified only the following properties: ${expectedProperties.join(
        ', '
      )}`
    );
  }

  // check if value has valid types for each property
  const { refDate, refWeekday, startOffset, endOffset } =
    value as DateRangeOptions;

  if (refDate !== undefined && !isValidRefDate(refDate)) {
    throw new ValidationError(
      'refDate',
      refDate,
      'Date object or luxon DateTime object.'
    );
  }

  if (refWeekday !== undefined && !isValidWeekday(refWeekday)) {
    throw new ValidationError(
      'refWeekday',
      refWeekday,
      'a number between 1 and 7.'
    );
  }

  if (
    (startOffset !== undefined && !isNumber(startOffset)) ||
    (isNumber(startOffset) && startOffset < 0)
  ) {
    throw new ValidationError('startOffset', startOffset, `a number >= 0`);
  }

  if (
    (endOffset !== undefined && !isNumber(endOffset)) ||
    (isNumber(endOffset) && endOffset < 0)
  ) {
    throw new ValidationError('endOffset', endOffset, `a number >= 0`);
  }
}
