import crypto from 'crypto-js';
import rabbit from 'crypto-js/rabbit';
import { isString } from 'lodash';
import serialize from 'serialize-javascript';
import { validate } from './utils';

export default ({
  encrypted_data,
  secret_key,
  give_back_invalid = false,
}: {
  encrypted_data: any;
  secret_key: string;
  give_back_invalid?: boolean;
}) => {
  validate(encrypted_data, 'Encrypted Data', 'data');
  validate(secret_key, 'Secret Key', 'string');
  validate(give_back_invalid, 'Give back invalid', 'boolean');

  let line = 0;
  let data: any;
  try {
    const decrypted = rabbit.decrypt(
      isString(encrypted_data) ? encrypted_data : serialize(encrypted_data),
      secret_key
    );

    line = 1;
    data = decrypted;

    const decrypted_string = decrypted.toString(crypto.enc.Utf8);

    line = 2;
    data = decrypted_string;

    const decrypted_data = eval(`( ${decrypted_string} )`);

    line = 3;

    return decrypted_data;
  } catch (err) {
    switch (err.message) {
      case 'Malformed UTF-8 data': {
        if (give_back_invalid) {
          return encrypted_data;
        }
        throw new Error('Data not encrypted or invalid key!');
      }
      default:
        console.error('Error on line', line, data);
        throw err;
    }
  }
};
