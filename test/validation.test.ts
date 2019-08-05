import { validate } from '../src';

describe('validation', () => {
  it('should correctly validate', () => {
    expect(() => {
      validate('asd', 'string', 'string');
      validate(true, 'boolean', 'boolean');
      validate({}, 'object', 'object');
      validate([], 'array', 'array');
    }).not.toThrow();
  });

  it('should throw if empty string', () => {
    expect(() => {
      validate('', 'string', 'string');
    }).toThrowError('string must be a non-empty string');
  });

  it('should throw if not string', () => {
    expect(() => {
      validate(null, 'null', 'string');
    }).toThrowError('null must be a non-empty string');
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

  it('should throw if not array', () => {
    expect(() => {
      validate({}, 'object', 'array');
    }).toThrowError('object must be an array');
  });
});
