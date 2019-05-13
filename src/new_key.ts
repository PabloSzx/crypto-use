import { MongoClient } from 'mongodb';
import { generate } from 'randomstring';
import { isEmpty } from 'validate.js';
import { validate } from './utils';

export default async ({
  url,
  name,
  key,
  dbName = 'keys',
  collectionName = 'keys',
  overwrite = false,
  generateOptions = {},
}: {
  url: string;
  name: string;
  key?: string;
  dbName?: string;
  collectionName?: string;
  overwrite?: boolean;
  generateOptions?: {
    length?: number;
    readable?: boolean;
    charset?: 'alphanumeric' | 'numeric' | 'alphabetic' | 'hex' | 'string';
    capitalization?: 'lowerse' | 'uppercase' | undefined;
  };
}): Promise<string> => {
  validate(url, 'url', 'string');
  validate(name, 'key', 'string');
  validate(generateOptions, 'randomOptions', 'object');
  validate(dbName, 'dbName', 'string');
  validate(collectionName, 'collectionName', 'string');

  if (isEmpty(key)) {
    key = generate({
      length: 32,
      readable: false,
      capitalization: undefined,
      ...generateOptions,
    });
  } else {
    validate(key, 'key', 'string');
  }

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });
    const collection = client.db(dbName).collection(collectionName);

    if (overwrite) {
      const doc = await collection.replaceOne(
        {
          _id: name,
        },
        {
          _id: name,
          key,
        },
        {
          upsert: true,
        }
      );
      client.close();
      if (doc.modifiedCount > 0) {
        return `Modified ${name}`;
      } else if (doc.upsertedCount > 0) {
        return `Inserted ${name}`;
      }
      return `${name} not modified`;
    }
    await collection.insertOne({
      _id: name,
      key,
    });

    client.close();

    return `Inserted ${name}`;
  } catch (err) {
    throw err;
  }
};
