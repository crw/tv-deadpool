import expect from 'expect';
// App imports
import {getKey} from 'app/utils';


describe('utils/getKey', () => {

  it('should return a nested key-value when it exists.', () => {
    let obj = {
      foo: {
        bar: {
          baz: 5
        }
      }
    };
    expect(getKey(obj, 'foo.bar.baz')).toBe(5);
  });

  it('should return undefined when a nested key-value does not exist.', () => {
    let obj = {
      foo: {
        bar: {
          baz: 5
        }
      }
    };
    expect(getKey(obj, 'foo.bar.baz.bingo')).toBe(undefined);
  });

  it('should return the default when a nested key-value does not exist and a default is specified.', () => {
    let obj = {
      foo: {
        bar: {
          baz: 5
        }
      }
    };
    let defaultValue = 'spoon';
    expect(getKey(obj, 'foo.bar.baz.bingo', defaultValue)).toBe(defaultValue);
  });

  it('should return the default when the argument is not an object.', () => {
    let obj = 5;
    let defaultValue = 'spoon';
    expect(getKey(obj, 'foo.bar.baz.bingo', defaultValue)).toBe(defaultValue);
  });

  it('should return the default when a nested key-value is null or undefined.', () => {
    let obj = {
      foo: {
        bar: {
          baz: null
        }
      }
    };
    let defaultValue = 'spoon';
    expect(getKey(obj, 'foo.bar.baz', defaultValue)).toBe(defaultValue);

    obj.foo.bar.baz = undefined;
    expect(getKey(obj, 'foo.bar.baz', defaultValue)).toBe(defaultValue);

  });

  it('should return the value when a nested key-value is 0 or false.', () => {
    let obj = {
      foo: {
        bar: {
          baz: 0
        }
      }
    };
    expect(getKey(obj, 'foo.bar.baz')).toBe(0);
    obj.foo.bar.baz = false;
    expect(getKey(obj, 'foo.bar.baz')).toBe(false);
  });
});
