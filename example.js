const { encrypt, decrypt } = require('crypto-use');

const data = {
  a: 1,
  b: 2,
  c: 3,
};

const secret_key = 'asd';

const encrypted_data = encrypt({
  data,
  secret_key,
});

console.log(encrypted_data);

const decrypted_data = decrypt({
  encrypted_data,
  secret_key,
});
