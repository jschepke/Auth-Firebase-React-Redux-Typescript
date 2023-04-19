import { DateTime } from 'luxon';
import { describe, expect, test } from 'vitest';

import {
  DateRangeOptions,
  Weekday,
} from '../../../src/utils/date_range/dateRange';
import { validateDateRangeOptions } from '../../../src/utils/date_range/validateDateRangeOptions';
import { isNumber } from '../../../src/utils/isNumber';
import { isValidWeekday } from '../../../src/utils/isValidWeekday';

describe('validateDateRangeOptions', () => {
  const invalidInputValues = [
    { invalidInput: null },
    { invalidInput: undefined },
    { invalidInput: [] },
    { invalidInput: {} },
    { invalidInput: 1 },
    { invalidInput: -1 },
    { invalidInput: [1] },
    { invalidInput: 'test' },
    { invalidInput: '2021-12-25' },
    { invalidInput: ['test'] },
    { invalidInput: true },
    { invalidInput: false },
  ];

  describe('general input value', () => {
    test.each(invalidInputValues)(
      'throws error if value is $invalidInput',
      ({ invalidInput }) => {
        expect(() => validateDateRangeOptions(invalidInput)).toThrowError();
      }
    );
    test('throws error if unknown property is specified', () => {
      expect(() => validateDateRangeOptions({ test: 'test' })).toThrowError();
      expect(() =>
        validateDateRangeOptions({ test: 'test', refDate: 'test' })
      ).toThrowError();
    });
  });

  describe('refDate value', () => {
    // filter valid refDate values
    const filter = invalidInputValues.filter(
      (item) => item.invalidInput !== undefined
    );

    // add invalid values specific to refDate
    const invalidRefDateValues = [
      { invalidInput: new Date('invalid') },
      { invalidInput: DateTime.invalid('invalid') },
      ...filter,
    ];

    const validRefDateValues = [
      { description: 'current Date: new Date()', value: new Date() },
      {
        description: 'specific Date: new Date(2021, 11, 25)',
        value: new Date(2021, 11, 25),
      },
      {
        description: 'current DateTime: DateTime.now()',
        value: DateTime.now(),
      },
      {
        description: 'specific DateTime: DateTime.fromISO("2021-12-25")',
        value: DateTime.fromISO('2021-12-25'),
      },
    ];

    test.each(invalidRefDateValues)(
      'throws error if refDate is $invalidInput',
      ({ invalidInput: invalidValue }) => {
        expect(() =>
          validateDateRangeOptions({ refDate: invalidValue })
        ).toThrowError();
      }
    );

    test.each(validRefDateValues)(
      `doesn't throw error if value is $description`,
      (item) => {
        expect(() =>
          validateDateRangeOptions({ refDate: item.value })
        ).not.toThrowError();
      }
    );
  });

  describe('refWeekday value', () => {
    // filter valid refWeekday values
    const filter = invalidInputValues.filter(
      (item) =>
        !isValidWeekday(item.invalidInput) && item.invalidInput !== undefined
    );
    // add invalid values specific to refWeekday
    const invalidRefWeekdayValues = [
      { invalidInput: -1 },
      { invalidInput: 0 },
      { invalidInput: 8 },
      ...filter,
    ];

    test.each(invalidRefWeekdayValues)(
      'throws error if refWeekday is $invalidInput',
      ({ invalidInput }) => {
        expect(() =>
          validateDateRangeOptions({ refWeekday: invalidInput })
        ).toThrowError();
      }
    );

    // test for all valid values
    test.each([1, 2, 3, 4, 5, 6, 7])(
      "doesn't throw error if refWeekday is %d",
      (num) => {
        expect(() => validateDateRangeOptions({ refWeekday: num }));
      }
    );
  });

  describe('offset value', () => {
    const invalidOffsetValues = invalidInputValues.filter(
      (item) =>
        !(isNumber(item.invalidInput) && item.invalidInput > 0) &&
        item.invalidInput !== undefined
    );

    const validOffsetValues = [1, 123];

    describe('startOffset', () => {
      test.each(invalidOffsetValues)(
        'throws error if startOffset value is $invalidInput',
        ({ invalidInput }) => {
          expect(() =>
            validateDateRangeOptions({ startOffset: invalidInput })
          ).toThrowError();
        }
      );

      test.each(validOffsetValues)(
        "doesn't throw error if startOffset is %d",
        (num) => {
          expect(() =>
            validateDateRangeOptions({ startOffset: num })
          ).not.toThrowError();
        }
      );
    });

    describe('endOffset', () => {
      test.each(invalidOffsetValues)(
        'throws error if endOffset value is $invalidInput',
        ({ invalidInput }) => {
          expect(() =>
            validateDateRangeOptions({ endOffset: invalidInput })
          ).toThrowError();
        }
      );

      test.each(validOffsetValues)(
        "doesn't throw error if endOffset is %d",
        (num) => {
          expect(() =>
            validateDateRangeOptions({ endOffset: num })
          ).not.toThrowError();
        }
      );
    });
  });

  describe('mixed valid and invalid values', () => {
    // some valid inputs
    const validInputs: DateRangeOptions[] = [
      {
        refDate: DateTime.now(),
        refWeekday: Weekday.Saturday,
        endOffset: 3,
        startOffset: 1,
      },
      {
        refWeekday: Weekday.Monday,
        startOffset: 2,
      },
      {
        refDate: new Date(2021, 11, 25), // replaced with JS Date object
        endOffset: 5,
      },
      {
        endOffset: 0,
        startOffset: 0,
      },
      {
        refDate: DateTime.now().plus({ days: 2 }),
        refWeekday: Weekday.Friday,
      },
      {
        refDate: new Date(2022, 0, 1), // replaced with JS Date object
        refWeekday: Weekday.Sunday,
        endOffset: 4,
        startOffset: 2,
      },
      {
        refWeekday: Weekday.Wednesday,
        endOffset: 3,
      },
      {
        refDate: DateTime.now().minus({ days: 2 }),
        startOffset: 1,
      },
    ];
    const invalidInputs = [
      {
        refDate: DateTime.fromISO('invalid'), // invalid DateTime
        refWeekday: Weekday.Saturday,
        endOffset: 3,
        startOffset: 1,
      },
      {
        refWeekday: Weekday.Monday,
        startOffset: -1, // invalid offset
      },
      {
        refDate: new Date(`test`), // invalid Date
        endOffset: 5,
      },
      {
        endOffset: '1', // invalid offset
        startOffset: 3,
      },
      {
        refDate: DateTime.now().plus({ days: 2 }),
        refWeekday: 'friday', // invalid
      },
      {
        refDate: new Date(2022, 0, 1),
        refWeekday: null, // invalid
        endOffset: 4,
        startOffset: null, // invalid
      },
      {
        refWeekday: 9, // invalid
        endOffset: 3,
      },
      {
        refDate: DateTime.now().minus({ days: 2 }),
        startOffset: [], // invalid
      },
    ];

    test.each(validInputs)(
      `doesn't throw errors or return anything for %s`,
      (input) => {
        expect(() => validateDateRangeOptions(input)).not.toThrowError();
        expect(validateDateRangeOptions(input)).toBeUndefined();
      }
    );

    test.each(invalidInputs)(
      `throw errors if invalid options mixed with valid ones: %s`,
      (input) => {
        expect(() => validateDateRangeOptions(input)).toThrowError();
      }
    );
  });
});
