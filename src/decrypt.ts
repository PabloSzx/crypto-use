import crypto from 'crypto-js';
import rabbit from 'crypto-js/rabbit';
import { validate } from './utils';

export default ({
  encrypted_data,
  secret_key,
}: {
  encrypted_data: string;
  secret_key: string;
}) => {
  validate(encrypted_data, 'Encrypted Data', 'string');
  validate(secret_key, 'Secret Key', 'string');

  return eval(
    `( ${rabbit
      .decrypt(encrypted_data, secret_key)
      .toString(crypto.enc.Utf8)} )`
  );
};
