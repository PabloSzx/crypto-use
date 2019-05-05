import _ from 'lodash';

export const validate = (
  data: any,
  label: string,
  type: 'string' | 'data' | 'boolean' = 'data'
) => {
  switch (type) {
    case 'string': {
      if (!_.isString(data)) {
        throw new Error(`${label} must be string!`);
      }
      if (_.isEmpty(data)) {
        throw new Error(`${label} must be a valid string`);
      }
      return;
    }
    case 'data': {
      if (_.isEmpty(data)) {
        throw new Error(`${label} must be valid data`);
      }
      return;
    }
    case 'boolean': {
      if (!_.isBoolean(data)) {
        throw new Error(`${label} must be a boolean`);
      }
      return;
    }
    default:
  }
};
