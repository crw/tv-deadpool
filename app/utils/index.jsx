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

export function isObject(obj) {
  return (typeof obj === "object") && (obj !== null);
}