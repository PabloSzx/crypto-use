import dotenv from 'dotenv';
import { get_key, new_key } from '../src';

dotenv.config();

const url = process.env.MONGODB_URL || '';

describe('key retrieving', () => {
  it('should overwrite a key', async done => {
    const name = 'test';

    await new_key({
      url,
      name,
      key: 'asda',
      overwrite: true,
    });
    const { key: key1 } = await get_key({
      url,
      name,
    });

    await new_key({
      url,
      name,
      key: 'asdb',
      overwrite: true,
    });

    const { key: key2 } = await get_key({
      url,
      name,
    });

    expect([key1, key2]).toEqual(['asda', 'asdb']);
    done();
  }, 30000);

  it('should generate a key', async done => {
    const info = await new_key({
      url,
      name: 'test4',
      overwrite: true,
    });

    expect(info).toBeTruthy();
    done();
  });

  it('should insert a key', async done => {
    const info = await new_key({
      url,
      name: 'test2',
      key: 'asd',
      overwrite: true,
    });

    expect(info).toBeTruthy();
    done();
  });
  it('should get a key', async done => {
    const key = await get_key({
      url,
      name: 'test2',
    });
    expect(key).toBeTruthy();
    done();
  });
});

describe('key management errors', () => {
  it('insert should throw if overwrite is false', async done => {
    await new_key({
      url,
      name: 'test3',
      key: 'asd',
      overwrite: true,
    });

    new_key({
      url,
      name: 'test3',
      key: 'asd',
      overwrite: false,
    }).catch(e => {
      expect(e).toBeTruthy();
      done();
    });
  }, 30000);
});
