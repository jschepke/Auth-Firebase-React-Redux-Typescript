// Import the class you want to test
import { DateTime } from 'luxon';
import { beforeEach, describe, expect, it, test } from 'vitest';

import { DateRange, Weekday } from '../dateRange';
import { getRandomDateTime } from '../getRandomDateTime';
import { getRandomWeekday } from '../getRandomWeekday';

describe('DateRange', () => {
  describe('Instance', () => {
    it('should throw an error if any parameters are passed to the constructor', () => {
      // @ts-expect-error: testing invalid input
      expect(() => new DateRange('2022-01-01')).toThrowError(
        'DateRange constructor does not accept any parameters'
      );
    });

    it('should create a DateRange instance', () => {
      const dateRange = new DateRange();
      expect(dateRange).toBeInstanceOf(DateRange);
    });

    it('should create a DateRange instance with refDate as DateTime.now()', () => {
      const dateRange = new DateRange();
      expect(dateRange.refDate).toBeInstanceOf(DateTime);
      expect(dateRange.refDate.toISO().substring(0, 19)).toEqual(
        DateTime.now().toISO().substring(0, 19)
      );
    });

    it('should create a DateRange instance with empty dates array', () => {
      const dateRange = new DateRange();
      expect(dateRange.dates).toEqual([]);
    });

    it(`should create a DateRange instance with refWeekday equal to 1 (1 for Monday)`, () => {
      const dateRange = new DateRange();
      expect(dateRange.refWeekday).toEqual(Weekday.Monday);
      expect(dateRange.refWeekday).toEqual(1);
    });
  });

  describe('isValidRefDate', () => {
    test('returns true for valid Date or DateTime objects', () => {
      const dateRange = new DateRange();
      const date = new Date();
      const dateTime = DateTime.local();
      expect(dateRange.isValidRefDate(date)).toBe(true);
      expect(dateRange.isValidRefDate(dateTime)).toBe(true);
    });

    test('returns false for invalid Date or DateTime objects or other types of values', () => {
      const dateRange = new DateRange();
      const invalidDate = new Date('invalid');
      const invalidDateTime = DateTime.invalid('invalid');
      const values = [null, undefined, 'string', 123, true, {}, []];
      expect(dateRange.isValidRefDate(invalidDate)).toBe(false);
      expect(dateRange.isValidRefDate(invalidDateTime)).toBe(false);
      for (const value of values) {
        expect(dateRange.isValidRefDate(value)).toBe(false);
      }
    });
  });

  describe('isValidRefWeekday', () => {
    const dateRange = new DateRange();

    test('should return true for valid weekdays', () => {
      expect(dateRange.isValidRefWeekday(1)).toBe(true);
      expect(dateRange.isValidRefWeekday(3)).toBe(true);
      expect(dateRange.isValidRefWeekday(7)).toBe(true);
    });

    test('should return false for invalid weekdays', () => {
      expect(dateRange.isValidRefWeekday(0)).toBe(false);
      expect(dateRange.isValidRefWeekday(8)).toBe(false);
      expect(dateRange.isValidRefWeekday(-1)).toBe(false);
    });

    test('should return false for non-numbers', () => {
      expect(dateRange.isValidRefWeekday('Monday')).toBe(false);
      expect(dateRange.isValidRefWeekday(null)).toBe(false);
      expect(dateRange.isValidRefWeekday(undefined)).toBe(false);
    });
  });

  describe('eachDayOfWeek', () => {
    // let randomRefDate: DateTime;
    // let randomRefWeekday: Weekday;

    // Before each test, generate some random dates and date ranges
    beforeEach(() => {
      // Generate an array of 10 random dates between 01.01.2000 and 31.12.2100
      // randomDates = getRandomDateTimes({ count: 10 });
      // Generate a random date between 01.01.2000 and 31.12.2100 as the reference date
      // randomRefDate = getRandomDateTimes({ count: 1 })[0];
      // Pick a random weekday from the Weekday enum as the reference weekday
      // randomRefWeekday = getRandomWeekday();
    });

    it('should create 7 dates over multiple calls with no options specified', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        const result = dateRange.eachDayOfWeek();
        const dates = result.dates;
        expect(dates.length).toEqual(7);
        dates.forEach((date) => expect(DateTime.isDateTime(date)).toBeTruthy());
      }
    });

    it('should create 7 dates over multiple calls with specified options', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        const randomRefDate = getRandomDateTime();
        const randomRefWeekday = getRandomWeekday();

        const result = dateRange.eachDayOfWeek({
          refDate: randomRefDate,
          refWeekday: randomRefWeekday,
        });
        const dates = result.dates;
        expect(dates.length).toEqual(7);
        dates.forEach((date) => expect(DateTime.isDateTime(date)).toBeTruthy());
      }
    });

    test('week includes the refDate and starts on the refWeekday, no options', () => {
      const dateRange = new DateRange();
      const instanceRefDate = dateRange.refDate;
      const instanceRefWeekday = dateRange.refWeekday;

      // The loop ensures that the result is the same for repeated calls
      for (let i = 0; i < 10; i++) {
        const result = dateRange.eachDayOfWeek();
        const dates = result.dates;

        expect(
          dates.find((date) => date.toISODate() === instanceRefDate.toISODate())
        ).toBeTruthy();

        expect(dates[0].weekday).toEqual(instanceRefWeekday);

        // Expect the first day in the array is a date before or the same as refDate option
        expect(dates[0].valueOf()).toBeLessThanOrEqual(
          instanceRefDate.valueOf()
        );
      }
    });

    test('week includes the refDate and starts on the refWeekday, options specified', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        // Random date to iterate along with every possible weekday
        const randomRefDate = getRandomDateTime();

        // Loop through each weekday from 1 to 7 with random date specified in the outer loop
        for (let weekday = 1; weekday <= 7; weekday++) {
          // Call the eachDayOfWeek() method with the refDate and refWeekday options
          const result = dateRange.eachDayOfWeek({
            refDate: randomRefDate,
            refWeekday: weekday,
          });
          const dates = result.dates;

          // Expect that one of the dates in the array matches the refDate option
          expect(
            dates.find((date) => date.toISODate() === randomRefDate.toISODate())
          ).toBeTruthy();

          // Expect that the first date in the array matches the refWeekday option
          expect(dates[0].weekday).toEqual(weekday);

          // Expect the first day in the array is a date before or the same as refDate option
          expect(dates[0].valueOf()).toBeLessThanOrEqual(
            randomRefDate.valueOf()
          );
        }
      }
    });

    test('week starts on a refDate or starts on a date that is before the refDate, no params.', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        // Call the eachDayOfWeek() method no options
        const result = dateRange.eachDayOfWeek();
        const dates = result.dates;

        expect(dates[0].valueOf()).toBeLessThanOrEqual(
          dateRange.dates[0].valueOf()
        );
      }
    });

    test('week starts on a refDate or starts on a date that is before the refDate, options specified', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        const randomRefDate = getRandomDateTime();
        const randomRefWeekday = getRandomWeekday();
        const result = dateRange.eachDayOfWeek({
          refDate: randomRefDate,
          refWeekday: randomRefWeekday,
        });
        const dates = result.dates;

        expect(dates[0].valueOf()).toBeLessThanOrEqual(randomRefDate.valueOf());
      }
    });

    test('each date of an array should start at the beginning of the date, no options', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        const result = dateRange.eachDayOfWeek();
        const dates = result.dates;

        dates.forEach((date) => {
          expect(date.toISO()).toBe(date.startOf('day').toISO());
        });
      }
    });

    test('each date of an array should start at the beginning of the date, options specified', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        const randomRefDate = getRandomDateTime();
        const randomRefWeekday = getRandomWeekday();

        const result = dateRange.eachDayOfWeek({
          refDate: randomRefDate,
          refWeekday: randomRefWeekday,
        });
        const dates = result.dates;

        dates.forEach((date) => {
          expect(date.toISO()).toBe(date.startOf('day').toISO());
        });
      }
    });

    test('Monday is the first date of an array with no specified options', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        const result = dateRange.eachDayOfWeek();
        const dates = result.dates;

        expect(dates[0].weekday).toEqual(Weekday.Monday);
      }
    });

    test('Monday is the first date of an array with specified refDate option', () => {
      const dateRange = new DateRange();

      for (let i = 0; i < 10; i++) {
        const randomRefDate = getRandomDateTime();

        const result = dateRange.eachDayOfWeek({ refDate: randomRefDate });
        const dates = result.dates;

        expect(dates[0].weekday).toEqual(Weekday.Monday);
      }
    });

    //Todo move to "convert methods" test set
    /* it.skip('should convert dates to milliseconds', () => {
      const dateRange = new DateRange();
      const dates = dateRange.eachDayOfWeek().toLuxonDates();
      const milliseconds = dateRange.toMilliseconds();
      expect(milliseconds).toHaveLength(7);
      // Use map and valueOf methods to convert dates to milliseconds
      expect(milliseconds).toEqual(dates.map((date) => date.valueOf()));
    }); */
    test('should throw error if refDate is invalid', () => {
      const dateRange = new DateRange();
      // @ts-expect-error: testing invalid inputs
      expect(() => dateRange.eachDayOfWeek({ refDate: 'test' })).toThrowError();
      // @ts-expect-error: testing invalid inputs
      expect(() => dateRange.eachDayOfWeek({ refDate: 1 })).toThrowError();
    });

    test('should throw error if refWeekday is invalid', () => {
      const dateRange = new DateRange();
      expect(() =>
        // @ts-expect-error: testing invalid inputs
        dateRange.eachDayOfWeek({ refWeekday: 'test' })
      ).toThrowError();
      // @ts-expect-error: testing invalid inputs
      expect(() => dateRange.eachDayOfWeek({ refWeekday: 0 })).toThrowError();
      // @ts-expect-error: testing invalid inputs
      expect(() => dateRange.eachDayOfWeek({ refWeekday: 8 })).toThrowError();
    });

    test('should not throw error if refDate is valid JS Date', () => {
      const dateRange = new DateRange();
      expect(() =>
        dateRange.eachDayOfWeek({ refDate: new Date() })
      ).not.toThrowError();
    });
  });
});
