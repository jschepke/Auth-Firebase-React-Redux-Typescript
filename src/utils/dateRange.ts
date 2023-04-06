import { DateTime } from 'luxon';

export enum Weekday {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

/**
 * TODO add detailed description how to use config
 */
interface DateRangeConfig {
  /**
   * Reference date for the range to be returned.
   * @remarks default to `current date`
   *
   * @example
   * ```
   * new DateRange().week({ refDate: DateTime.fromISO('2023-05-15') });
   * ```
   */
  refDate?: DateTime | Date;

  /**
   * The weekday to be used as the first day of a week range.
   *
   *@remarks Default to Monday.
   *
   *@example
   * ```
   * // the range will start from Sunday
   * new DateRange().week({refDate: someDate, refWeekday: Weekday.Sunday });
   * ```
   */
  refWeekday?: Weekday;

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
}

// TODO
interface IDateRange {
  dates: DateTime[];
  getLuxonDates(): DateTime[];
  toMilliseconds(): number[];
  eachDayOfWeek(config?: DateRangeConfig): DateRange;
  eachDayOfMonth(config?: DateRangeConfig): DateRange;
}

export class DateRange {
  //TODO implement better suited interface to implement class

  /**
   * @remarks Default value for DateRange instance, equals to current time.
   */
  private _refDate: DateTime;

  /**
   * @remarks Default value for DateRange instance, equals to 1 (Monday)
   */
  private _refWeekday: Weekday;

  /**
   * Instance dates storage.
   */
  private _dates: DateTime[];

  constructor() {
    if (arguments.length > 0) {
      throw new Error('DateRange constructor does not accept any parameters');
    }

    this._refDate = DateTime.now();
    this._refWeekday = Weekday.Monday;
    this._dates = [];
  }

  get refDate(): DateTime {
    return this._refDate;
  }

  get refWeekday(): Weekday {
    return this._refWeekday;
  }

  get dates(): DateTime[] {
    return this._dates;
  }

  /*================================ VALIDATION METHODS ==============================*/

  public isValidDateRef(refDate: unknown): boolean {
    return this._isValidDateRef(
      this._isValidDate(refDate),
      this._isValidDateTime(refDate)
    );
  }

  private _validateRefDate(refDate: unknown): void {
    if (!this.isValidDateRef(refDate)) {
      throw new Error(
        `Invalid date. Date must be typeof Date or to be valid Luxon DateTime`
      );
    }
  }

  private _isValidDateRef(
    isValidDate: boolean,
    isValidDateTime: boolean
  ): boolean {
    if (isValidDate || isValidDateTime) {
      return true;
    } else {
      return false;
    }
  }

  private _isValidDateTime(date: unknown): date is DateTime {
    if (date instanceof DateTime && date.isValid) {
      return true;
    } else {
      return false;
    }
  }

  private _isValidDate(date: unknown): date is Date {
    if (!(date instanceof Date)) {
      return false;
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return false;
    }

    return true;
  }

  /*================================ CONVERTING METHODS ==============================*/

  /**
   * Returns an array of Luxon DateTime objects
   */
  toLuxonDates(): DateTime[] {
    return this._dates;
  }

  /**
   * Returns an array of JavaScript Date objects
   */
  toJSDates(): Date[] {
    return this._dates.map((date) => date.toJSDate());
  }

  /**
   * Returns an array of dates in milliseconds format
   *
   * @returns Array of milliseconds
   */
  toMilliseconds(): number[] {
    return this._dates.map((date) => date.valueOf());
  }

  /**
   * Returns an array of dates in ISOTime format
   *
   * @returns Array of dates in ISOTime format
   */
  toISOTime(): string[] {
    return this._dates.map((date) => date.toISOTime());
  }

  /**
   * @returns Array of dates in ISODate format
   */
  toISODate(): string[] {
    return this._dates.map((date) => date.toISODate());
  }

  /**
   * @returns Array of dates in ISO format
   */
  toISO(): string[] {
    return this._dates.map((date) => date.toISO());
  }

  // ..other converting methods

  /*================================ TIME RANGE METHODS ==============================*/

  /**
   * Creates a date for each day of a week range related to reference date.
   *
   * By default, the range starts on Monday before or at the reference date.
   * Each date starts at its beginning.
   *
   * The date range can be specified by passing a `config` object.
   *
   * @param config - {@link DateRangeConfig}
   * @returns The `DateRange` instance with the dates array populated.
   *
   * @example //TODO
   */
  eachDayOfWeek(config?: DateRangeConfig) {
    const { refDate = this._refDate, refWeekday = this._refWeekday } =
      config || {};

    this._validateRefDate(refDate);

    // Set date at the beginning of a day
    let firstDate: DateTime;
    if (refDate instanceof Date) {
      firstDate = DateTime.fromJSDate(refDate).startOf('day');
    } else {
      firstDate = refDate.startOf('day');
    }

    // Find the first date of a week range for reference date
    while (firstDate.weekday !== refWeekday) {
      firstDate = firstDate.minus({ days: 1 });
    }

    // Clear the existing dates array
    this._dates = [];

    let currentWeekDate = firstDate;
    for (let i = 0; i < 7; i++) {
      this._dates.push(currentWeekDate);
      currentWeekDate = currentWeekDate.plus({ days: 1 });
    }

    return this;
  }

  /* eachDayOfMonth(): DateRange {
    const { refDate: initDate, refWeekday: beginningWeekday } = this;

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
  } */

  days(/* number of days */) {
    //...
  }
}
