import { MongoClient } from 'mongodb';
import { validate } from './utils';

export default async ({
  url,
  name,
  key,
  dbName = 'keys',
  collectionName = 'keys',
  overwrite = false,
}: {
  url: string;
  name: string;
  key: string;
  dbName?: string;
  collectionName?: string;
  overwrite?: boolean;
}): Promise<string> => {
  validate(url, 'Mongo URL', 'string');
  validate(name, 'Key Name', 'string');
  validate(key, 'Key', 'string');
  validate(dbName, 'Database Name', 'string');
  validate(collectionName, 'Collection Name', 'string');
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
