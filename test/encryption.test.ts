import '../src';
import fs from 'fs';
import path from 'path';
import { encrypt, decrypt } from '../src';

describe('encryption works', () => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, './data/data.json')).toString()
  );

  const secret_key = 'asd';

  const encrypted_data = encrypt({
    data,
    secret_key,
  });

  const decrypted_data = decrypt({
    encrypted_data,
    secret_key,
  });

  it('encrypts fine', () => {
    expect(decrypted_data).toEqual(data);
  });
});
