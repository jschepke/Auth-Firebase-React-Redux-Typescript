import { DateTime, Zone } from 'luxon';

export enum Weekday {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

interface DateRangeConfig {
  /**
   * Reference date for the range to be returned.
   * @remarks default: `current time`
   *
   * @example
   * ```
   * new DateRange({ initDate: DateTime.fromISO('2023-05-15') });
   * ```
   */
  date?: DateTime;

  /**
   * The first weekday for week interval.
   *
   * @remarks default to `Monday`
   *
   *@example
   * ```
   * new DateRange().week({ firstWeekday: Weekday.Sunday }); // the range will start from Sunday
   * ```
   */
  firstWeekday?: Weekday;

  /**
   * Todo *
   *
   * time frame to be added before or after getting time range
   * @example
   * ```
   * { time_frame: day, before 3, after: 1}
   * ```
   */
  // offset?;

  /**
   * Zone identifier. "Set" the DateTime's zone to specified zone.
   *
   * @remarks default: `"local"`
   *
   * @example
   * IANA string, such as
   *
   * ```
   * "America/New_York"
   * or
   * "UTC+3"
   * ```
   * More about zones:
   *
   * {@link https://moment.github.io/luxon/#/zones}
   *
   * {@link https://moment.github.io/luxon/api-docs/index.html#datetimesetzone}
   *
   */
  zone?: Zone;
}

export class DateRange implements DateRangeConfig {
  date;
  firstWeekday;
  dates: DateTime[];
  zone: undefined;

  constructor() {
    this.date = DateTime.now();
    this.firstWeekday = Weekday.Monday;
    this.dates = [];
  }

  /**
   * Returns array of Luxon DateTime objects
   */
  getLuxonDates(): DateTime[] {
    return this.dates;
  }

  /**
   * Returns an array of dates in milliseconds format
   *
   * @returns Array of milliseconds
   */
  toMilliseconds(): number[] {
    return this.dates.map((date) => date.valueOf());
  }

  /**
   * Creates a date for each day for a week range related to reference date.
   *
   * By default, the range starts on Monday before or at the reference date.
   *
   * The date range can be specified by passing a `config` object.
   *
   * @param config - // TODO
   * @returns The DateRange instance with the dates array populated.
   *
   * @example //TODO
   */
  eachDayOfWeek(config?: DateRangeConfig) {
    const {
      date = this.date,
      firstWeekday = this.firstWeekday,
      //TODO
      //zone
    } = config || this;

    // Find the first date of a week range for reference date
    let firstDate = date;
    while (firstDate.weekday !== firstWeekday) {
      firstDate = firstDate.minus({ days: 1 });
    }

    // Clear the existing dates array
    this.dates = [];

    let currentWeekDate = firstDate;
    for (let i = 0; i < 7; i++) {
      this.dates.push(currentWeekDate);
      currentWeekDate = currentWeekDate.plus({ days: 1 });
    }

    return this;
  }

  eachDayOfMonth(): DateRange {
    const { date: initDate, firstWeekday: beginningWeekday } = this;

    // Get the first day of the current month
    const firstDayOfMonth = initDate.startOf('month');

    // Get the weekday number of the first day of the month
    const firstWeekdayOfMonth = firstDayOfMonth.weekday;

    // Get the difference between the first weekday of the month and the beginning weekday
    const diff = firstWeekdayOfMonth - beginningWeekday;
    const beginningMonthDate = firstDayOfMonth.minus({ days: diff });

    // Clear the existing dates array
    this.dates = [];

    let currentDate = beginningMonthDate;
    for (let i = 0; i < 35; i++) {
      // console.log(currentDate.toLocaleString());
      this.dates.push(currentDate);
      currentDate = currentDate.plus({ days: 1 });
      // console.log(currentDate.toLocaleString());
    }

    return this;
  }

  days(/* number of days */) {
    //...
  }

  // ..other converting methods
}
