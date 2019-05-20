import { isString, isEmpty, isBoolean, isArray } from 'validate.js';
import { isPlainObject } from 'lodash';

export const validate = (
  data: any,
  label: string,
  type: 'string' | 'boolean' | 'object' | 'array'
) => {
  switch (type) {
    case 'string': {
      if (!isString(data) || isEmpty(data)) {
        throw new Error(`${label} must be a non-empty string!`);
      }
      return;
    }
    case 'boolean': {
      if (!isBoolean(data)) {
        throw new Error(`${label} must be a boolean`);
      }
      return;
    }
    case 'object': {
      if (!isPlainObject(data)) {
        throw new Error(`${label} must be an object`);
      }
      return;
    }
    case 'array': {
      if (!isArray(data)) {
        throw new Error(`${label} must be an array`);
      }
    }
  }
};
