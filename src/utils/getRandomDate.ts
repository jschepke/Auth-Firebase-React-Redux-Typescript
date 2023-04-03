import { DateTime } from 'luxon';

export function getRandomDate(
  startDate: DateTime = DateTime.fromISO('1970-01-01'),
  endDate: DateTime = DateTime.fromISO('2100-01-01')
) {
  const timeDiff = endDate.valueOf() - startDate.valueOf();
  const randomTime = Math.random() * timeDiff;
  const randomDate = DateTime.fromMillis(startDate.valueOf() + randomTime);
  return randomDate;
}

export function getRandomDates(
  numberOfDates: number
  //   startDate: DateTime = DateTime.fromISO('1970-01-01'),
  //   endDate: DateTime = DateTime.fromISO('2100-01-01')
) {
  const arr: DateTime[] = [];

  for (let i = numberOfDates; i > 0; i--) {
    arr.push(getRandomDate());
  }
  return arr;
}
