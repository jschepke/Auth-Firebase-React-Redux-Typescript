// Import the class you want to test
import { DateTime } from 'luxon';
import { describe, expect, it, test } from 'vitest';

import { DateRange, Weekday } from './dateRange';
import { getRandomDates } from './getRandomDate';

describe('DateRange', () => {
  describe('Instance', () => {
    it('should throw an error if any parameters are passed to the constructor', () => {
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

  describe('eachDayOfWeek', () => {
    it('should return an array of 7 luxon DateTime objects for the current week', () => {
      const dateRange = new DateRange();
      const dates = dateRange.eachDayOfWeek().getLuxonDates();
      dates.forEach((date) => expect(DateTime.isDateTime(date)).toBeTruthy());
      expect(dates).toHaveLength(7);
      // Use snapshots to compare the output with a previous version
      // expect(dates).toMatchSnapshot();
    });
    test('each date of an array should start at the beginning of the date', () => {
      const dateRange = new DateRange();
      const dates = dateRange.eachDayOfWeek().getLuxonDates();
      dates.forEach((date) => {
        expect(date.toISO()).toBe(date.startOf('day').toISO());
      });
    });

    it('should return return an array with first element to be date <= refDate', () => {
      const dateRange = new DateRange();
      const { refDate } = dateRange;
      const date = dateRange.eachDayOfWeek().getLuxonDates()[0];
      console.log(
        `date: ${date.toISODate()}, initDate: ${refDate.toISODate()}`
      );
      expect(date.valueOf()).toBeLessThanOrEqual(refDate.valueOf());
    });

    it('should return an array with first element to date <= initDate for all weekdays', () => {
      const dateRange = new DateRange();
      const weekdayKeys = Object.keys(Weekday);
      const weekdays = weekdayKeys.slice(7);

      weekdays.forEach((weekday) => {
        const initDate = DateTime.fromISO('2023-01-17');
        const dates = dateRange
          .eachDayOfWeek({
            refWeekday: Weekday[weekday],
            refDate: initDate,
          })
          .getLuxonDates();
        const date = dates[0];
        // console.log(
        //   `weekday: ${weekday} date: ${date.toLocaleString({
        //     weekday: 'long',
        //     day: '2-digit',
        //     month: '2-digit',
        //     year: '2-digit',
        //   })}, initDate: ${initDate.toISODate()}`
        // );
        expect(date.valueOf()).toBeLessThanOrEqual(initDate.valueOf());
      });
    });

    it('should Monday be in first date of an array for default config of beginningWeekday', () => {
      const dateRange = new DateRange();
      const { refWeekday } = dateRange;
      const date = dateRange.eachDayOfWeek().getLuxonDates()[0];
      expect(date.weekday).toEqual(refWeekday);

      getRandomDates(10).forEach((randomDate) => {
        const firstDateInArray = dateRange
          .eachDayOfWeek({ refDate: randomDate })
          .getLuxonDates()[0];
        expect(firstDateInArray.weekday).toEqual(refWeekday);
      });
    });

    it('should return an array of dates of the same length for every iteration', () => {
      const dateRange = new DateRange();
      let iterations = 0;
      do {
        const dates = dateRange.eachDayOfWeek().getLuxonDates();
        expect(dates).toHaveLength(7);
        iterations += 1;
      } while (iterations <= 3);
    });

    it('should convert dates to milliseconds', () => {
      const dateRange = new DateRange();
      const dates = dateRange.eachDayOfWeek().getLuxonDates();
      const milliseconds = dateRange.toMilliseconds();
      expect(milliseconds).toHaveLength(7);
      // Use map and valueOf methods to convert dates to milliseconds
      expect(milliseconds).toEqual(dates.map((date) => date.valueOf()));
    });

    test('should throw error if refDate is invalid', () => {
      const dateRange = new DateRange();
      // const dates = dateRange.eachDayOfWeek({ refDate: 'test' }).toISO();
      expect(() => dateRange.eachDayOfWeek({ refDate: 'test' })).toThrowError();
      expect(() => dateRange.eachDayOfWeek({ refDate: 1 })).toThrowError();
    });

    test('should not throw error if refDate is Date object', () => {
      const dateRange = new DateRange();
      // const dates = dateRange.eachDayOfWeek({ refDate: 'test' }).toISO();
      expect(() =>
        dateRange.eachDayOfWeek({ refDate: new Date() })
      ).not.toThrowError();
    });

    it('should return array of dates if refDate is JS Date', () => {
      const dateRange = new DateRange().eachDayOfWeek();
      expect(dateRange.dates).toHaveLength(7);
      dateRange.dates.forEach((date) => {
        expect(date).toBeInstanceOf(DateTime);
        expect(date.isValid).toBeTruthy();
      });
    });
  });

  describe.skip('eachDayOfMonth', () => {
    it('should return an array of dates for the current month', () => {
      const dateRange = new DateRange();
      const dates = dateRange.eachDayOfMonth().getLuxonDates();
      expect(dates).toHaveLength(35);
      // Use snapshots to compare the output with a previous version
      expect(dates).toMatchSnapshot();
    });
  });
});
