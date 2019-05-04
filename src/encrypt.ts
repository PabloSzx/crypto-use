import rabbit from 'crypto-js/rabbit';
import serialize from 'serialize-javascript';

export default ({
  data,
  secret_key,
}: {
  data: any;
  secret_key: string | CryptoJS.WordArray;
}) => {
  return rabbit.encrypt(serialize(data), secret_key).toString();
};
