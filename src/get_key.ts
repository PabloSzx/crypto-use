import { MongoClient } from 'mongodb';
import { validate } from './utils';

export default async ({
  url,
  name,
  dbName = 'keys',
  collectionName = 'keys',
}: {
  url: string;
  dbName?: string;
  collectionName?: string;
  name: string;
}): Promise<{
  key: string;
  name: string;
}> => {
  validate(url, 'url', 'string');
  validate(name, 'name', 'string');
  validate(dbName, 'dbName', 'string');
  validate(collectionName, 'collectionName', 'string');
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });
    const collection = client.db(dbName).collection(collectionName);

    const key: { key: string; _id: string } | null = await collection.findOne(
      {
        _id: name,
      },
      {
        projection: {
          _id: 1,
          key: 1,
        },
      }
    );

    client.close();

    if (key) {
      return {
        name: key._id,
        key: key.key,
      };
    }

    throw new Error(
      `Key not available for ${name} in ${collectionName} collection`
    );
  } catch (err) {
    throw err;
  }
};
