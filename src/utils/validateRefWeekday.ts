import { isValidWeekday } from './isValidWeekday';

export function validateRefWeekday(refWeekday: unknown): void {
  if (!isValidWeekday(refWeekday)) {
    throw new Error(`Invalid weekday. Weekday must be number between 1 and 7`);
  }
}
