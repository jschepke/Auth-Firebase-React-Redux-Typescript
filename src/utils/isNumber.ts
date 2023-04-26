/**
 * A utility function that checks if the input is a number, including integers and decimals.
 *
 * @remarks The function doesn't check for integers
 *
 * @param input - The input to be checked
 * @returns A boolean indicating whether the input is a integer or decimal number.
 */
export function isNumber(input: unknown): input is number {
  return typeof input === 'number' && Number.isFinite(input);
}
