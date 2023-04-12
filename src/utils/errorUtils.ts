/* eslint-disable max-len */
/**
 * A custom error class that represents a generic error with a code and a message.
 * It extends the built-in Error class and provides an additional property for the error code.
 */
class CustomError extends Error {
  code: string;

  /**
   * Creates a new instance of CustomError.
   *
   * @param code - The code of the error. //TODO implement code enum for other scenarios
   * @param message - The message of the error.
   */
  constructor(code: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * A custom error class that represents a validation error for an option value.
 *
 * It extends the CustomError class and provides additional properties for the invalid option name,
 * value, expected type or format and optional description.
 */
export class ValidationError extends CustomError {
  optionName: string;
  optionValue: unknown;
  expected: string;
  description?: string;

  /**
   * Creates a new instance of ValidationError.
   *
   * @param optionName - The name of the invalid option.
   * @param optionValue - The value of the invalid option.
   * @param expected - The expected type or format of the option value.
   * @param description - An optional description of the validation error.
   *
   * @example
   * ```
   * // create an instance of ValidationError with some sample parameters
   * const error = new ValidationError('foo', 42, 'a string', 'This option is required for the operation.');
   * // log the error to the console
   * console.error(error); //-> ValidationError: Invalid foo: 42. Expected a string. This option is required for the operation.
   * ```
   */
  constructor(
    optionName: string,
    optionValue: unknown,
    expected: string,
    description?: string
  ) {
    const message = `Invalid ${optionName}: ${JSON.stringify(
      optionValue
    )}. Expected ${expected}.${description ? ' ' + description : ''}`;
    // call the super constructor with the code 'validation' and the formatted message
    super('validation', message);
    this.optionName = optionName;
    this.optionValue = optionValue;
    this.expected = expected;
    this.description = description;
  }
}
