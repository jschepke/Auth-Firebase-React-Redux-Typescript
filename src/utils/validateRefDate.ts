import { isValidRefDate } from './isValidRefDate';

export function validateRefDate(refDate: unknown): void {
  if (!isValidRefDate(refDate)) {
    throw new Error(
      `Invalid date. Date must be typeof Date or to be valid Luxon DateTime`
    );
  }
}
