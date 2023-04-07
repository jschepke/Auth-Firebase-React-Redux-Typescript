import { DateTime } from 'luxon';

/**
 * Options of the getRandomDates function.
 */
interface RandomDateTimesOptions {
  /**
   * The number of dates to create (default 1).
   */
  count?: number;
  /**
   * The start of the range (default start of time epoch).
   */
  start?: DateTime;
  /**
   * The end of the range (default 31.12.2100).
   */
  end?: DateTime;
}

/**
 * Returns an array of random luxon DateTime objects within a given range.
 *
 * @param options - An object with optional parameters for the function.
 * See {@link RandomDateTimesOptions} for details.
 * @returns An array of random dates.
 * @throws Error if the options are invalid.
 */
export function getRandomDateTimes(
  options: RandomDateTimesOptions = {}
): DateTime[] {
  const {
    count = 1,
    start = DateTime.fromMillis(0),
    end = DateTime.fromISO('2100-12-31'),
  } = options;

  if (count < 1) {
    throw new Error('Count must be positive');
  }
  if (!start.isValid || !end.isValid) {
    throw new Error('Invalid start or end date');
  }
  if (start > end) {
    throw new Error('Start date must be before or equal to end date');
  }

  const dates: DateTime[] = [];

  for (let i = 0; i < count; i++) {
    const randomMillis =
      start.toMillis() + Math.random() * (end.toMillis() - start.toMillis());

    const randomDate = DateTime.fromMillis(randomMillis);

    dates.push(randomDate);
  }

  return dates;
}
