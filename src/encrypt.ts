import rabbit from 'crypto-js/rabbit';
import serialize from 'serialize-javascript';
import { validate } from './utils';

export default ({ data, secret_key }: { data: any; secret_key: string }) => {
  validate(secret_key, 'secret_key', 'string');

  return rabbit.encrypt(serialize(data), secret_key).toString();
};
