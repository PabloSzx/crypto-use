import dotenv from 'dotenv';
import { get_key, new_key } from '../src';

dotenv.config();

describe('key retrieving', () => {
  const url = process.env.MONGODB_URL || '';

  it('should insert a key', async done => {
    const name = 'test';
    const key = 'asd';
    const info = await new_key({
      url,
      name,
      key,
      overwrite: true,
    });

    expect(info).toBeTruthy();
    done();
  });
  it('should get a key', async done => {
    const key = await get_key({
      url,
      name: 'test',
    });
    expect(key).toBeTruthy();
    done();
  });
});