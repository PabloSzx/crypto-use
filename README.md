# crypto-use

![version](https://badgen.net/npm/v/crypto-use)
![install-size](https://badgen.net/packagephobia/install/crypto-use)
![publish-size](https://badgen.net/packagephobia/publish/crypto-use)
![dependencies](https://badgen.net/david/dep/pabloszx/crypto-use)
![dev-dependencies](https://badgen.net/david/dev/pabloszx/crypto-use)
[![CircleCI](https://circleci.com/gh/PabloSzx/crypto-use.svg?style=svg)](https://circleci.com/gh/PabloSzx/crypto-use)

## Description

Library designed to simplify the use of encrypted data.

Right now only using [**rabbit**](https://cryptojs.gitbook.io/docs/#ciphers) from [crypto-js](https://www.npmjs.com/package/crypto-js)

## Features

Right now there are four features working:

- Encrypt Data using Ciphers
- Dencrypt Data using Ciphers
- Search for a key to a specified **MongoDB** database and collection
- Save a key to a specified **MongoDB** database and collection

There are a couple of featured planned to do:

- **Key cache**: mantain a _cache_ of keys, in order to not having to query a key everytime it is needed.
- **Any encryption method**: give the user the ability to use any available encryption method

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
import { encrypt } from 'crypto-use';

const encrypted_data = encrypt(
  {
    Hello: 'World',
  },
  'your-totally-secure-key'
);
```

#### Decryption

```javascript
import { decrypt } from 'crypto-use';

//encrypted_data previously encrypted

const decrypted = decrypt(encrypted_data, 'your-totally-secure-key');
```

#### Key Retrieval

```javascript
import { get_key } from 'crypto-use';

(async () => {
  const key = await get_key({
    url: 'mongodb://localhost:27017', // required
    name: 'test_key', // required
    dbName: 'database_name', // "keys" by default
    collectionName: 'collection_name', // "keys" by default
  });

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
    key: 'your-totally-secure-key', //required
    dbName: 'database_name', // "keys" by default
    collectionName: 'collection_name', // "keys" by default
    overwrite: true, // "false" by default
  });

  // info === "Inserted test_key"
})();
```

## License

The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
