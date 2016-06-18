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


export function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    if (Object.getOwnPropertyNames(obj).length > 0) return false;

    return true;
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

/**
 * Converts a Firebase "array" hash into a Javascript array, useful as
 * javascript arrays can be sorted, filtered, and mapped.
 * @param firebaseArray object "array" from Firebase. Each entry will have "key"
 *     mapped to the item key from the object.
 * @return array
 */
export function toArray(firebaseArray) {
  if (isObject(firebaseArray)) {
    let itemsArr = [];
    Object.keys(firebaseArray).forEach((item) => {
      itemsArr.push(firebaseArray[item])
      // Preserve the key, which is often the ID for the object.
      itemsArr[itemsArr.length-1].key = item;
    });
    return itemsArr;
  } else {
    throw 'Invalid data, not an object.';
  }
}

/**
 * Returns a normalized username for deduplication purposes.
 */
export function normalizeName(name) {
  return name.toLowerCase().replace(/[ \-\_\=\+\/\\\.\,\<\>\;\:\'\"\?\!\@\#\$\%\^\&\*\(\)]/g, '');
}

/**
 * Returns a currency-formatted string from a number.
 */
export function toCurrencyString(value) {
  if (typeof value !== "number") {
    value = parseInt(value, 10);
  }
  value = value || 0;
  let prefix =  '';
  let symbol = '$';

  if (value < 0) {
    value = value * -1;
    prefix = '-';
  }
  return [prefix, symbol, value.toLocaleString()].join('');
}

/**
 * @see http://stackoverflow.com/a/7557433/506244
 */
export function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
