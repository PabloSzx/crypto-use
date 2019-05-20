import new_key from './new_key';
import get_key from './get_key';
import { has } from 'lodash';

interface Hash<T> {
  [key: string]: T;
}

export default class KeyManager {
  encryption_keys: Hash<string>;
  url: string;
  collectionName: string;
  dbName: string;
  constructor({
    url,
    collectionName = 'keys',
    dbName = 'keys',
  }: {
    url: string;
    collectionName?: string;
    dbName?: string;
  }) {
    this.encryption_keys = {};
    this.url = url;
    this.collectionName = collectionName;
    this.dbName = dbName;
  }

  async getKey(
    name: string,
    url: string = this.url,
    collectionName: string = this.collectionName,
    dbName: string = this.dbName
  ) {
    if (has(this.encryption_keys, name)) {
      return this.encryption_keys[name];
    }
    try {
      await new_key({
        url: this.url,
        name,
        collectionName,
        dbName,
      });
    } catch (err) {
      // already existant key
    } finally {
      try {
        const { key } = await get_key({
          url,
          name,
          collectionName,
          dbName,
        });

        this.encryption_keys[name] = key;
      } catch (err) {
        throw err;
      }
      return this.encryption_keys[name];
    }
  }
}
