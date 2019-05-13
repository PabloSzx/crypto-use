import { isString, isEmpty, isBoolean, isObject, isArray } from 'validate.js';

export const validate = (
  data: any,
  label: string,
  type: 'string' | 'data' | 'boolean' | 'object' = 'data'
) => {
  switch (type) {
    case 'string': {
      if (!isString(data)) {
        throw new Error(`${label} must be string!`);
      }
      if (isEmpty(data)) {
        throw new Error(`${label} must be a valid string`);
      }
      return;
    }
    case 'data': {
      if (isEmpty(data)) {
        throw new Error(`${label} must be valid data`);
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
      if (!isObject(data) || isArray(data)) {
        throw new Error(`${label} must be an object`);
      }
      return;
    }
    default:
  }
};
