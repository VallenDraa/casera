/**
 *
 * @param {Array} arr target array
 * @param {string} key key that will be used as reference when filtering the duplicate object in the target array
 * @returns filtered array with no duplicate objects
 */
export const removeDupeObjInArrayByKey = (arr, key) => {
  const values = arr.map((o) => o[key]);
  const filtered = arr.filter((item, index) => {
    return !values.includes(item[key], index + 1);
  });

  return filtered;
};

/**
 *
 * @param {State} setState React setState function
 * @param {any} value This parameter will be used as the setState parameter
 * @returns Will allow promise methods to be used after setting a state for better developer experience when handling react state
 */

export const setStatePro = async (setState, value) => setState(value);
