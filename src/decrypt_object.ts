import reduce from 'lodash/reduce';
import decrypt from './decrypt';
import { validate } from './utils';

export default ({
  encrypted_object,
  secret_key,
}: {
  encrypted_object: any;
  secret_key: string;
}) => {
  validate(secret_key, 'secret_key', 'string');
  validate(encrypted_object, 'encrypted_object', 'object');

  return reduce(
    encrypted_object,
    (acum, value, key) => {
      switch (key) {
        case '_id':
          return {
            ...acum,
            [key]: value,
          };
        default:
          return {
            ...acum,
            [key]: decrypt({
              encrypted_data: value,
              secret_key,
              give_back_invalid: true,
            }),
          };
      }
    },
    {}
  );
};
