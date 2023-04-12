import { describe, expect, test } from 'vitest';

import { ValidationError } from '../errorUtils';

describe('CustomError', () => {
  describe('ValidationError', () => {
    // test the constructor
    test('should create an instance of ValidationError with the given option name, value and expected type with no description', () => {
      const error = new ValidationError('foo', 42, 'a string');

      expect(error).toBeInstanceOf(ValidationError);
      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe('Invalid foo: 42. Expected a string.');
      expect(error.optionName).toBe('foo');
      expect(error.optionValue).toBe(42);
      expect(error.expected).toBe('a string');
    });

    test('should create an instance of ValidationError with the given option name, value, expected type and description', () => {
      const error = new ValidationError(
        'foo',
        42,
        'a string',
        'This option is required for the operation.'
      );
      expect(error).toBeInstanceOf(ValidationError);
      expect(error.name).toBe('ValidationError');
      expect(error.message).toBe(
        'Invalid foo: 42. Expected a string. This option is required for the operation.'
      );
      expect(error.optionName).toBe('foo');
      expect(error.optionValue).toBe(42);
      expect(error.expected).toBe('a string');
      expect(error.description).toBe(
        'This option is required for the operation.'
      );
    });
  });
});
