'use strict';

/**
 * @param {Array<T>} arr
 * @param {number} length
 * @return {T[][]}
 */
function combination(arr, length){
  const ret = [];

	//先に特殊な場合を片付ける
  length = +length;
  if (length < 0 || length > arr.length)
    return [];
  if (length == 0)
    return [[]];
  if (length == 1) {
    return arr.map(x => [x]);
  }
  if (length == arr.length - 1) {
    let i;
    for ( i = 0; i < arr.length; ++i) {
      ret.push(arr.filter((val, idx) => idx !== i));
    }
    return ret;
  }
	//ここで初めてコピー
  const parsed = [].concat(arr);
  if (length == arr.length)
    return [parsed];

	//2つ以上length-1以下のとき
  for(;;) {
    if (parsed.length === length) {
      ret.push(parsed);
      break;
    }
    const val = [parsed.pop()];
    const inner_ret = combination(parsed, length - 1);
    let i2;
    for ( i2 = 0; i2 < inner_ret.length; ++i2) {
      ret.push(inner_ret[i2].concat(val));
    }
  }
  return ret;
}

module.exports = combination;
