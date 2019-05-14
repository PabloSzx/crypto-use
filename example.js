const {
  encrypt,
  decrypt,
  encrypt_object,
  decrypt_object,
} = require('crypto-use');

const data = {
  _id: '5cd223c243ed3900220f8ee5',
  a: 1,
  b: 2,
  c: 3,
};

const secret_key = 'asd';

const encrypted_data = encrypt({
  data,
  secret_key,
});

console.log('encrypted_data', encrypted_data);

const decrypted_data = decrypt({
  encrypted_data,
  secret_key,
});

console.log('decrypted_data', decrypted_data);

const encrypted_object = encrypt_object({
  data,
  secret_key,
});

console.log('encrypted_object', encrypted_object);

const decrypted_object = decrypt_object({
  encrypted_object,
  secret_key,
});

console.log('decrypted_object', decrypted_object);
