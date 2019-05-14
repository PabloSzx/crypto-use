import reduce from 'lodash/reduce';
import encrypt from './encrypt';
import { validate } from './utils';

export default ({
  data,
  secret_key,
}: {
  data: any;
  secret_key: string;
}): any => {
  validate(secret_key, 'secret_key', 'string');
  validate(data, 'data', 'object');

  return reduce(
    data,
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
            [key]: encrypt({
              data: value,
              secret_key,
            }),
          };
      }
    },
    {}
  );
};
