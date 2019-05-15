import dotenv from 'dotenv';
import { generate } from 'randomstring';
import { get_key, new_key } from '../src';

dotenv.config();

const url = process.env.MONGODB_URL || '';
const collectionName = 'test';
const dbName = 'test';
describe('key retrieving', () => {
  it('should overwrite a key', async done => {
    const name = generate();

    await new_key({
      url,
      name,
      key: 'asda',
      overwrite: true,
      collectionName,
      dbName,
    });
    const { key: key1 } = await get_key({
      url,
      name,
      collectionName,
      dbName,
    });

    await new_key({
      url,
      name,
      key: 'asdb',
      overwrite: true,
      collectionName,
      dbName,
    });

    const key2 = await get_key({
      url,
      name,
      collectionName,
      dbName,
    });

    expect([key2.name, key1, key2.key]).toEqual([name, 'asda', 'asdb']);
    done();
  }, 30000);

  it('should generate a key', async done => {
    const info = await new_key({
      url,
      name: 'test4',
      overwrite: true,
      collectionName,
      dbName,
      generateOptions: {
        length: 10,
        readable: false,
        charset: 'alphanumeric',
        capitalization: 'uppercase',
      },
    });

    expect(info).toBeTruthy();
    done();
  }, 30000);

  it('should insert a key', async done => {
    const info = await new_key({
      url,
      name: 'test2',
      key: 'asd',
      overwrite: true,
      collectionName,
      dbName,
    });

    expect(info).toBeTruthy();
    done();
  }, 30000);
  it('should get a key', async done => {
    const key = await get_key({
      url,
      name: 'test2',
      collectionName,
      dbName,
    });
    expect(key).toBeTruthy();
    done();
  }, 30000);
});

describe('key error throws', () => {
  it('insert should throw if url is wrong', async () => {
    await expect(
      new_key({
        url: `mongodb://${generate({ length: 5 })}:${generate({
          length: 5,
        })}@localhost:27017`,
        name: generate(),
      })
    ).rejects.toThrow();
  });
});

describe('key management errors', () => {
  it('insert should throw if overwrite is false', async done => {
    await new_key({
      url,
      name: 'test3',
      key: 'asd',
      overwrite: true,
      collectionName,
      dbName,
    });

    new_key({
      url,
      name: 'test3',
      key: 'asd',
      overwrite: false,
      collectionName,
      dbName,
    }).catch(e => {
      expect(e).toBeTruthy();
      done();
    });
  }, 30000);
  it('should throw if not key available', async () => {
    await expect(
      get_key({
        url,
        name: generate(),
      })
    ).rejects.toThrowError('Key not available');
  }, 30000);
});
