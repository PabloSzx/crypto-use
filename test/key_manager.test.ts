import dotenv from 'dotenv';
import { KeyManager, new_key } from '../src';
import { generate } from 'randomstring';

dotenv.config();

describe('key manager works', () => {
  const url = process.env.MONGODB_URL || '';
  const collectionName = 'test';
  const dbName = 'test';

  const name = 'test3';

  it('should complete insertion of a new key', async done => {
    const key_manager = new KeyManager({
      url,
      collectionName,
      dbName,
    });
    const generatedName = generate();
    const key = await key_manager.getKey(generatedName);

    expect(key).toBeTruthy();

    done();
  }, 30000);

  it('should get a key from a already existant in database', async done => {
    await new_key({
      url,
      name,
      collectionName,
      dbName,
      overwrite: true,
    });

    const key_manager = new KeyManager({
      url,
      collectionName: 'test',
      dbName: 'test',
    });

    const key = await key_manager.getKey(name);

    expect(key).toBeTruthy();

    done();
  }, 30000);

  it('should get a key from cache', async done => {
    const key_manager = new KeyManager({
      url,
      collectionName,
      dbName,
    });

    const generatedName = generate();

    const key1 = await key_manager.getKey(generatedName);

    const key2 = await key_manager.getKey(generatedName);
    expect(key2).toBe(key1);
    done();
  }, 30000);

  it('should throw if invalid mongodb url', async () => {
    const key_manager = new KeyManager({
      url: `mongodb://${generate({ length: 5 })}:${generate({
        length: 5,
      })}@localhost:27017`,
    });

    await expect(
      key_manager.getKey(
        name,
        `mongodb://${generate({ length: 5 })}:${generate({
          length: 5,
        })}@localhost:27017`,
        'keys',
        'keys'
      )
    ).rejects.toThrow();
  }, 30000);
});
