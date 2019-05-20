import { reduce, includes } from 'lodash';
import decrypt from './decrypt';
import { validate } from './utils';

export default ({
  encrypted_object,
  secret_key,
  ignore_keys = ['_id'],
}: {
  encrypted_object: any;
  secret_key: string;
  ignore_keys?: string[];
}) => {
  validate(secret_key, 'secret_key', 'string');
  validate(encrypted_object, 'encrypted_object', 'object');
  validate(ignore_keys, 'ignore_keys', 'array');

  return reduce(
    encrypted_object,
    (acum, value, key) => {
      if (includes(ignore_keys, key)) {
        return {
          ...acum,
          [key]: value,
        };
      }
      return {
        ...acum,
        [key]: decrypt({
          encrypted_data: value,
          secret_key,
          give_back_invalid: true,
        }),
      };
    },
    {}
  );
};
