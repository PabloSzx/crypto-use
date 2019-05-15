# crypto-use

[![github-version](https://badgen.net/github/release/pabloszx/crypto-use)](https://github.com/PabloSzx/crypto-use)
[![npm-version](https://badgen.net/npm/v/crypto-use)](https://www.npmjs.com/package/crypto-use)

[![install-size](https://badgen.net/packagephobia/install/crypto-use)](https://www.npmjs.com/package/crypto-use)
[![publish-size](https://badgen.net/packagephobia/publish/crypto-use)](https://www.npmjs.com/package/crypto-use)
[![dependencies](https://badgen.net/david/dep/pabloszx/crypto-use)](https://runpkg.com/?crypto-use/package.json)
[![dev-dependencies](https://badgen.net/david/dev/pabloszx/crypto-use)](https://runpkg.com/?crypto-use/package.json)

[![CircleCI](https://circleci.com/gh/PabloSzx/crypto-use.svg?style=svg)](https://circleci.com/gh/PabloSzx/crypto-use)

[![Try crypto-use on RunKit](https://badge.runkitcdn.com/crypto-use.svg)](https://npm.runkit.com/crypto-use)

## Description

Library designed to simplify the use of encrypted data.

Right now only using [**rabbit**](https://cryptojs.gitbook.io/docs/#ciphers) from [crypto-js](https://www.npmjs.com/package/crypto-js)

## Features

Right now there are four features working:

- Encrypt Data using Ciphers
- Decrypt Data using Ciphers
- Search for a key to a specified **MongoDB** database and collection
- Save a key to a specified **MongoDB** database and collection
- **Key Manager**: mantain a _cache_ of keys, in order to not having to query a key everytime it is needed.

There are a couple of featured planned to do:

- **Any encryption method**: give the user the ability to use any available encryption method
- Improve the **Key Manager**

## Installation

```bash
yarn add crypto-use
```

or

```bash
npm install --save crypto-use
```

## How to use

#### Encryption

```javascript
import { encrypt, encrypt_object } from 'crypto-use';

const encrypted_data = encrypt({
  // data can be any valid javascript expression, for example: strings, objects, arrays, functions (no fat arrow functions), numbers, dates, etc...

  data: {
    Hello: 'World',
  },
  secret_key: 'your-totally-secure-key',
});

const encrypted_object = encrypt_object({
  // object encryption keeps all the outer keys of the object, but encrypts all the values
  // except the keys specified by "ignore_keys" which has to be an array of strings

  // data must to be an object
  data: {
    _id: '5cd223c243ed3900220f8ee5',
    hello: 'world',
  },
  secret_key: 'your-totally-secure-key',
  ignore_keys: ['_id'], // optional, by default "ignore_keys" contains "_id"
});
```

#### Decryption

```javascript
import { decrypt, decrypt_object } from 'crypto-use';

// encrypted_data previously encrypted
// encrypted_data === "U2FsdGVkX1+4iC1daCbTnMFFQjOX94Q4U2FsdGVkX1+4iC1daCbTnMFFQjOX94Q4"

const decrypted_data = decrypt({
  encrypted_data: encrypted_data,
  secret_key: 'your-totally-secure-key',
});

// If you are not sure if your data is encrypted, you can get back the data you tried to decrypt by giving the parameter "give_back_invalid", by default it is false

const not_encrypted_data = decrypt({
  encrypted_data: 'I am not encrypted',
  secret_key: 'your-totally-secure-key',
  give_back_invalid: true,
});
// not_encrypted_data === "I am not encrypted"

// encrypted_object previously encrypted
// encrypted_object ===  { _id: '5cd223c243ed3900220f8ee5', hello: "U2FsdGVkX1+4iC1daCbTnMFFQjOX94Q4U2Fs" }

// decrypt_object decrypts all the values of the object, except the keys specified by "ignore_keys" which has to be an array of strings

const decrypted_object = decrypt_object({
  encrypted_object: encrypted_object,
  secret_key: 'your-totally-secure-key',
  ignore_keys: ['_id'], // optional, by default "ignore_keys" contains "_id"
});
```

#### Key Retrieval

```javascript
import { get_key } from 'crypto-use';

(async () => {
  const { key, name } = await get_key({
    url: 'mongodb://localhost:27017', // required
    name: 'test_key', // required
    dbName: 'database_name', // optional, "keys" by default
    collectionName: 'collection_name', // optional, "keys" by default
  });

  // name === "test_key"
  // key === "your-totally-secure-key"
})();
```

#### Key Storage

```javascript
import { new_key } from 'crypto-use';

(async () => {
  const info = await new_key({
    url: 'mongodb://localhost:27017', // required
    name: 'test_key', // required
    key: 'your-totally-secure-key', // optional, random generated string by default
    dbName: 'database_name', // optional, "keys" by default
    collectionName: 'collection_name', // optional, "keys" by default
    overwrite: true, // optional, "false" by default
    generateOptions: {}, // optional, randomstring generate options by default
  });

  // info === "Inserted test_key"
})();
```

> If no key is given, it will be automatically generated using [randomstring](https://www.npmjs.com/package/randomstring#api), which you can customize using **generateOptions**

#### Key Manager

The Key Manager after it is instantiated it makes a _cache_, which you should only access by using the function **getKey** which works basically doing three things:

- If the **_name_** especified already exists in **_cache_** it returns the key asssociated
- If the **_name_** especified doesn't exists in **_cache_** it tries to get the **key** from the **database** and returns it
- If the **key** does not exists in database, it generates a new one and returns it

```javascript
import { KeyManager } from 'crypto-use';

(async () => {
  const key_manager = new KeyManager({
    url: 'mongodb://localhost:27017', // required
    collectionName: 'collection_name', // optional, "keys" by default
    dbName: 'database_name', // optional, "keys" by default
  });

  const key = await key_manager.getKey('name');

  // key === "your-totally-secure-key"
})();
```

## License

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
