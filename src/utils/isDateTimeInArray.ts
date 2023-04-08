/* eslint-disable max-len */
import { DateTime } from 'luxon';

import { isValidDateTime } from './isValidDateTime';

/**
 * Checks if a given luxon DateTime object is present in a given array of Luxon DateTime objects.
 *
 * @remarks Function uses DateTime.equals() to compare dates which is strick equality check.
 * Read more at {@link https://moment.github.io/luxon/api-docs/index.html#datetimeequals | DateTime equals}
 *
 * @param date - The date to check.
 * @param array - The array of dates to search in.
 * @returns True if the date is in the array, false otherwise.
 * @throws Error if the date is not a valid DateTime object or
 * the array is not an array of DateTime objects.
 */
export function isDateTimeInArray(date: DateTime, array: DateTime[]): boolean {
  // Check if date is a valid DateTime object
  if (!isValidDateTime(date)) {
    throw new Error('Invalid date');
  }
  // Check if array is an array of DateTime objects
  if (
    !Array.isArray(array) ||
    !array.every((element) => isValidDateTime(element))
  ) {
    throw new Error('Invalid array');
  }
  // Check if array is empty
  if (array.length === 0) {
    return false;
  }
  // Loop through the array of dates
  for (let i = 0; i < array.length; i++) {
    if (date.equals(array[i])) {
      return true;
    }
  }
  return false;
}
