import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';

import { getRandomDate, getRandomDates } from './getRandomDate';

describe('RandomDates', () => {
  it('should return rundom date', () => {
    const randomDate = getRandomDate();
    expect(randomDate).toBeInstanceOf(DateTime);
  });

  it('should return an array of random dates', () => {
    const randomDates = getRandomDates(10);
    expect(randomDates).toHaveLength(10);
    randomDates.forEach((date) => expect(date).toBeInstanceOf(DateTime));
    const firstDate = randomDates[0];
    randomDates
      .slice(1)
      .forEach((date) =>
        expect(date.toISODate()).not.toBe(firstDate.toISODate())
      );
  });
});
