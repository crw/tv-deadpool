/**
 * Returns a function that given two objects, sorts by an arbitrary key
 * @see Array.prototype.sort
 * @param key string name of sort-by key (default 'order')
 * @param reverse bool true to reverse sort order
 * @return number
 */
export function sortObjectsByKey(key = 'order', reverse=false) {
  return (a, b) => {
    let modifier = (reverse) ? -1 : 1;
    if (a[key] < b[key]) {
      return -1 * modifier;
    } else if (a[key] > b[key]) {
      return 1 * modifier;
    } else {
      return 0;
    }
  };
}

/**
 * Is it an object?
 */
export function isObject(obj) {
  return (typeof obj === "object") && (obj !== null);
}

/**
 * Returns the time now in milliseconds from Jan 1, 1970 UTC.
 */
export function now() {
  return Date.now();
}

/**
 * Returns the value at the specified key, the default value, or undefined.
 * @param object {foo: { bar: { baz: 4 } } }
 * @param string "foo.bar.baz"
 * @param value default value if no value is found at that key.
 */
export function getKey(obj, keyStr, defaultValue = undefined) {
  let keys = keyStr.split('.');
  let ref = obj;
  for (let i = 0; i < keys.length; i++) {
    if (!isObject(ref)) {
      return defaultValue;
    }
    ref = ref[keys[i]];
  }
  return (ref === null || ref === undefined) ? defaultValue : ref;
}
