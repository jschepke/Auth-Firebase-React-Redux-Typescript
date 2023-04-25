import { ValidationError } from '../errorUtils';
import { isEmptyObject } from '../isEmptyObject';
import { isObject } from '../isObject';
import { isValidDateTimeArray } from '../isValidDateTimeArray';
import { isValidOffset } from '../isValidOffset';
import { isValidTimeUnit } from '../isValidTimeUnit';
import { PropertiesMap } from '../types/utilityTypes';
import { ExtendRangeOptions } from './extendRange';

const extendRangeOptionsKeysMap: PropertiesMap<ExtendRangeOptions> = {
  rangeToExtend: 'rangeToExtend',
  startOffset: 'startOffset',
  endOffset: 'endOffset',
  timeUnit: 'timeUnit',
};
const expectedProperties = Object.values(extendRangeOptionsKeysMap);

export function validateExtendRangeOptions(value: unknown): void {
  // check if value is an object and has any properties
  if (!isObject(value) || isEmptyObject(value)) {
    throw new ValidationError(
      'options parameter',
      value,
      `an object with all of the following properties: ${expectedProperties.join(
        ', '
      )}`
    );
  }

  // check if the value has any of the not matching properties
  const notMatchingProperties = Object.keys(value).filter(
    (prop) => !(prop in extendRangeOptionsKeysMap)
  );

  if (notMatchingProperties.length > 0) {
    throw new ValidationError(
      'options parameter',
      value,
      `an object with all and only the following properties: ${expectedProperties.join(
        ', '
      )}`
    );
  }

  // get the expected properties from the input value
  const { endOffset, rangeToExtend, startOffset, timeUnit } =
    value as ExtendRangeOptions;

  // handle rangeToExtend
  if (!isValidDateTimeArray(rangeToExtend)) {
    throw new ValidationError(
      'rangeToExtend',
      rangeToExtend,
      'an array of DateTime'
    );
  }

  // handle timeUnit
  if (!isValidTimeUnit(timeUnit)) {
    throw new ValidationError(
      'timeUnit',
      timeUnit,
      'a string that is a DurationUnit',
      'DurationUnit is a string that represents a unit of time, such as "years", "months", "days", etc.`'
    );
  }

  //handle startOffset
  if (!isValidOffset(startOffset)) {
    throw new ValidationError('startOffset', startOffset, `a number >= 0`);
  }

  // handle endOffset
  if (!isValidOffset(endOffset)) {
    throw new ValidationError('endOffset', endOffset, `a number >= 0`);
  }
}
