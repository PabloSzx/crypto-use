import dotenv from 'dotenv';
import { get_key, new_key, encrypt, decrypt } from '../';
import fs from 'fs';
import path from 'path';

dotenv.config();

describe('entire cycle as dependency', () => {
  const url = process.env.MONGODB_URL || '';
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, './data/data.json')).toString()
  );
  const name = 'test3';
  const key = 'asd';
  const collectionName = 'test';
  const dbName = 'test';

  it('should complete the cycle', async done => {
    await new_key({
      url,
      name,
      key,
      overwrite: true,
      collectionName,
      dbName,
    });

    const { key: secret_key } = await get_key({
      url,
      name,
      collectionName,
      dbName,
    });

    const encrypted_data = encrypt({
      data,
      secret_key,
    });

    const decrypted_data = decrypt({
      encrypted_data,
      secret_key,
    });

    expect(decrypted_data).toEqual(data);
    done();
  });
});
