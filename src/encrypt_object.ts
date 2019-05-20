import { reduce, includes } from 'lodash';
import encrypt from './encrypt';
import { validate } from './utils';

export default ({
  data,
  secret_key,
  ignore_keys = ['_id'],
}: {
  data: any;
  secret_key: string;
  ignore_keys?: string[];
}): any => {
  validate(secret_key, 'secret_key', 'string');
  validate(data, 'data', 'object');
  validate(ignore_keys, 'ignore_keys', 'array');

  return reduce(
    data,
    (acum, value, key) => {
      if (includes(ignore_keys, key)) {
        return {
          ...acum,
          [key]: value,
        };
      }
      return {
        ...acum,
        [key]: encrypt({
          data: value,
          secret_key,
        }),
      };
    },
    {}
  );
};
