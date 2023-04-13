/**
 * A utility function that checks if the input is a valid number
 *
 * @param input - The input to be checked
 * @returns A boolean indicating whether the input is a valid number
 */
export function isNumber(input: unknown): input is number {
  return typeof input === 'number' && Number.isFinite(input);
}
