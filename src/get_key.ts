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
  validate(url, 'Mongo URL', 'string');
  validate(name, 'Key Name', 'string');
  validate(dbName, 'Database Name', 'string');
  validate(collectionName, 'Collection Name', 'string');

  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    });
    const collection = client.db(dbName).collection(collectionName);

    const key: { key: string; name: string } | null = await collection.findOne(
      {
        _id: name,
      },
      {
        projection: {
          name: 1,
          key: 1,
        },
      }
    );

    client.close();

    if (key) {
      return key;
    }

    throw new Error(
      `Key not available for ${name} in ${collectionName} collection`
    );
  } catch (err) {
    console.error(`Error getting key`, err);
    return err;
  }
};
