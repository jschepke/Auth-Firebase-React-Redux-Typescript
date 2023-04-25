import { ValidationError } from '../errorUtils';
import { isEmptyObject } from '../isEmptyObject';
import { isObject } from '../isObject';
import { isValidOffset } from '../isValidOffset';
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
 * Validates the date range options parameter.
 *
 * Throws an error if any properties of options object are
 * invalid or the parameter itself is invalid.
 */
export function validateDateRangeOptions(value: unknown): void {
  if (arguments.length === 0) {
    throw new ValidationError(
      'value parameter',
      value,
      'a single parameter for further validation'
    );
  }

  if (value === undefined) {
    return;
  }
  const expectedProperties = Object.values(dateRangeOptionsKeysMap);

  // check if value is an object and has any properties
  if (
    (value !== undefined && !isObject(value)) ||
    (value !== undefined && isEmptyObject(value))
  ) {
    throw new ValidationError(
      'options parameter',
      value,
      `no parameters or an object with at least one of the following properties: ${expectedProperties.join(
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

  // get the expected properties from the input value
  const { refDate, refWeekday, startOffset, endOffset } =
    value as DateRangeOptions;

  // handle refDate property
  if (refDate !== undefined && !isValidRefDate(refDate)) {
    // if (!isValidRefDate(refDate)) {
    throw new ValidationError(
      'refDate',
      refDate,
      'Date object or luxon DateTime object.'
    );
  }

  // handle refWeekday property
  if (refWeekday !== undefined && !isValidWeekday(refWeekday)) {
    throw new ValidationError(
      'refWeekday',
      refWeekday,
      'a number between 1 and 7.'
    );
  }

  // handle startOffset property
  if (startOffset !== undefined && !isValidOffset(startOffset)) {
    throw new ValidationError('startOffset', startOffset, `a number >= 0`);
  }

  // handle endOffset property
  if (endOffset !== undefined && !isValidOffset(endOffset)) {
    throw new ValidationError('endOffset', endOffset, `a number >= 0`);
  }
}
