import crypto from 'crypto-js';
import rabbit from 'crypto-js/rabbit';
import { validate } from './utils';

export default ({
  encrypted_data,
  secret_key,
  give_back_invalid = false,
}: {
  encrypted_data: string | any;
  secret_key: string;
  give_back_invalid?: boolean;
}) => {
  validate(secret_key, 'secret_key', 'string');
  validate(give_back_invalid, 'give_back_invalid', 'boolean');

  try {
    validate(encrypted_data, 'encrypted_data', 'string');

    const decrypted = rabbit.decrypt(encrypted_data, secret_key);

    const decrypted_string = decrypted.toString(crypto.enc.Utf8);

    const decrypted_data = eval(`( ${decrypted_string} )`);

    return decrypted_data;
  } catch (err) {
    if (give_back_invalid) {
      return encrypted_data;
    }
    throw new Error('Data not encrypted or invalid key!');
  }
};
