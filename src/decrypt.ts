import crypto from 'crypto-js';
import rabbit from 'crypto-js/rabbit';

export default ({
  encrypted_data,
  secret_key,
}: {
  encrypted_data: string | CryptoJS.WordArray;
  secret_key: string | CryptoJS.WordArray;
}) => {
  return eval(
    `( ${rabbit
      .decrypt(encrypted_data, secret_key)
      .toString(crypto.enc.Utf8)} )`
  );
};
