import crypto from 'crypto-js';
import rabbit from 'crypto-js/rabbit';
import { startsWith } from 'lodash';

export default ({
  encrypted_data,
  secret_key,
  give_back_invalid = false,
}: {
  encrypted_data: string | any;
  secret_key: string;
  give_back_invalid?: boolean;
}) => {
  if (give_back_invalid && !startsWith(encrypted_data, 'U2Fsd')) {
    return encrypted_data;
  }

  try {
    const decrypted = rabbit.decrypt(encrypted_data, secret_key);

    const decrypted_string = decrypted.toString(crypto.enc.Utf8);

    const decrypted_data = eval(`( ${decrypted_string} )`);

    return decrypted_data;
  } catch (err) {
    throw new Error('Data not encrypted or invalid key!');
  }
};
