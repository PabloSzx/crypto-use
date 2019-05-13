import { validate } from '../src';

describe('validation', () => {
  it('should throw if empty string', () => {
    expect(() => {
      validate('', 'string', 'string');
    }).toThrowError('string must be a valid string');
  });

  it('should throw if not string', () => {
    expect(() => {
      validate(null, 'null', 'string');
    }).toThrowError('null must be string');
  });

  it('should throw if empty data', () => {
    expect(() => {
      validate({}, 'object', 'data');
    }).toThrowError('object must be valid data');
  });

  it('should throw if not boolean', () => {
    expect(() => {
      validate(null, 'null', 'boolean');
    }).toThrowError('null must be a boolean');
  });

  it('should throw if not object', () => {
    expect(() => {
      validate([], 'array', 'object');
    }).toThrowError('array must be an object');
  });
});
