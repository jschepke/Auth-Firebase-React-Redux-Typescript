import { DateTime } from 'luxon';

enum Weekday {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

interface DateRangeConfig {
  initDate?: DateTime;
  beginningWeekday?: Weekday;
}

export class DateRange {
  private initDate: DateTime;
  private beginningWeekday: Weekday;
  dates: DateTime[];

  constructor(config?: DateRangeConfig) {
    this.initDate = config?.initDate || DateTime.now();
    this.beginningWeekday = config?.beginningWeekday || Weekday.Monday;
    this.dates = [];
  }

  // Add a getter method to access the dates array
  getDates(): DateTime[] {
    return this.dates;
  }

  week() {
    const { initDate, beginningWeekday } = this;

    // Get the weekday number of the current date (1 is Monday and 7 is Sunday)
    const currentWeekday = initDate.weekday;

    const diff = currentWeekday - beginningWeekday;
    const beginningWeekDate = initDate.minus({ days: diff });

    let currentDate = beginningWeekDate;
    for (let i = 0; i < 7; i++) {
      this.dates.push(currentDate);
      currentDate = currentDate.plus({ days: 1 });
    }

    return this;
  }

  month() {
    //...
  }

  days(/* number of days */) {
    //...
  }

  toMilliseconds(): number[] {
    // Use the getter method to access the dates array
    return this.getDates().map((date) => date.valueOf());
  }

  // ..other converting methods
}
