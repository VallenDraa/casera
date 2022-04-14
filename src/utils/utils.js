/**
 *
 * @param {Array} arr target array
 * @param {string} key object key that will be used as reference when filtering the duplicate object in the target array
 * @returns filtered array with no duplicate objects
 */
export const removeDupeObjInArray = (arr, key) => {
  const values = arr.map((o) => o[key]);
  const filtered = arr.filter((item, index) => {
    return !values.includes(item[key], index + 1);
  });

  return filtered;
};
