import fs from 'fs';
import path from 'path';
import { encrypt, decrypt } from '../src';

describe('encryption works', () => {
  it('encrypts fine', () => {
    const data = JSON.parse(
      fs.readFileSync(path.join(__dirname, './data/data.json')).toString()
    );

    const secret_key = 'asd';

    const encrypted_data = encrypt({
      data,
      secret_key,
    });

    const decrypted_data = decrypt({
      encrypted_data,
      secret_key,
    });

    expect(decrypted_data).toEqual(data);
  });
});

describe('encryption errors catches', () => {
  it('catches empty data', () => {
    expect(() => {
      encrypt({
        data: '',
        secret_key: 'asd',
      });
    }).toThrowError('Data must be valid');
  });

  it('catches empty secret key', () => {
    expect(() => {
      encrypt({
        data: 'asd',
        secret_key: '',
      });
    }).toThrowError('Secret Key must be a valid string');
  });
});

describe('decryption errors catches', () => {
  it('catches empty data', () => {
    expect(() => {
      decrypt({
        encrypted_data: '',
        secret_key: 'asd',
      });
    }).toThrowError('Encrypted Data must be valid data');
  });

  it('catches empty secret key', () => {
    expect(() => {
      decrypt({
        encrypted_data: 'asd',
        secret_key: '',
      });
    }).toThrowError('Secret Key must be a valid string');
  });

  it('catches not encrypted data', () => {
    expect(() => {
      decrypt({
        encrypted_data: 'asd',
        secret_key: 'asd',
      });
    }).toThrowError('Data not encrypted or invalid key');
  });

  it('catches wrong secret key', () => {
    expect(() => {
      decrypt({
        encrypted_data: encrypt({
          data: 'asd',
          secret_key: 'key1',
        }),
        secret_key: 'key2',
      });
    }).toThrowError('Data not encrypted or invalid key');
  });

  it('gives back if not encrypted data', () => {
    expect(
      decrypt({
        encrypted_data: { a: 1, b: 2 },
        secret_key: 'asd',
        give_back_invalid: true,
      })
    ).toEqual({
      a: 1,
      b: 2,
    });
  });
});
