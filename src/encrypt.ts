import rabbit from 'crypto-js/rabbit';
import serialize from 'serialize-javascript';
import { validate } from './utils';

export default ({ data, secret_key }: { data: any; secret_key: string }) => {
  validate(secret_key, 'Secret Key', 'string');
  validate(data, 'Data');

  return rabbit.encrypt(serialize(data), secret_key).toString();
};
