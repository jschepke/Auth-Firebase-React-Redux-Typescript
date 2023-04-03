// Import the class you want to test
import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';

import { DateRange, Weekday } from './dateRange';
import { getRandomDates } from './getRandomDate';

// Use describe to group your tests
describe('DateRange', () => {
  // Use it to write individual test cases
  it('should create a DateRange instance with default config', () => {
    // Use expect to make assertions
    const dateRange = new DateRange();
    expect(dateRange).toBeInstanceOf(DateRange);
    expect(dateRange.date).toBeInstanceOf(DateTime);
    expect(dateRange.date.toISODate()).toEqual(DateTime.now().toISODate());
    expect(dateRange.firstWeekday).toEqual(Weekday.Monday);
    expect(dateRange.dates).toEqual([]);
  });

  it('should return an array of dates for the current month', () => {
    const dateRange = new DateRange();
    const dates = dateRange.eachDayOfMonth().getLuxonDates();
    expect(dates).toHaveLength(35);
    // Use snapshots to compare the output with a previous version
    expect(dates).toMatchSnapshot();
  });

  it('should return an array of dates for the current week', () => {
    const dateRange = new DateRange();
    const dates = dateRange.eachDayOfWeek().getLuxonDates();
    dates.forEach((date) => expect(DateTime.isDateTime(date)).toBeTruthy());
    expect(dates).toHaveLength(7);
    // Use snapshots to compare the output with a previous version
    // expect(dates).toMatchSnapshot();
  });

  it('should return return an array with first element to date <= initDate', () => {
    const dateRange = new DateRange();
    const { date: initDate } = dateRange;
    const date = dateRange.eachDayOfWeek().getLuxonDates()[0];
    console.log(`date: ${date.toISODate()}, initDate: ${initDate.toISODate()}`);
    expect(date.valueOf()).toBeLessThanOrEqual(initDate.valueOf());
  });

  it('should return an array with first element to date <= initDate for all weekdays', () => {
    const dateRange = new DateRange();
    const weekdayKeys = Object.keys(Weekday);
    const weekdays = weekdayKeys.slice(7);

    weekdays.forEach((weekday) => {
      const initDate = DateTime.fromISO('2023-01-17');
      const dates = dateRange
        .eachDayOfWeek({
          firstWeekday: Weekday[weekday],
          date: initDate,
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

  it('should be Monday in first date of an array for default config of beginningWeekday', () => {
    const dateRange = new DateRange();
    const { firstWeekday: beginningWeekday } = dateRange;
    const date = dateRange.eachDayOfWeek().getLuxonDates()[0];
    expect(date.weekday).toEqual(beginningWeekday);

    getRandomDates(10).forEach((randomDate) => {
      const firstDateInArray = dateRange
        .eachDayOfWeek({ date: randomDate })
        .getLuxonDates()[0];
      expect(firstDateInArray.weekday).toEqual(beginningWeekday);
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
});
