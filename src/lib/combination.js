'use strict';

var _map = require('lodash/collection/map');
var _filter = require('lodash/collection/filter');

module.exports = function c(arr, length) {
	var ret = [];

	//先に特殊な場合を片付ける
	length = +length;
	if (length < 0 || length > arr.length)
		return [];
	if (length == 0)
		return [[]];
	if (length == 1) {
		return _map(arr, x => [x]);
	}
	if (length == arr.length - 1) {
		let i;
		for ( i = 0; i < arr.length; ++i) {
			ret.push(_filter(arr, (val, idx) => idx !== i));
		}
		return ret;
	}
	//ここで初めてコピー
	var parsed = [].concat(arr);
	if (length == arr.length)
		return [parsed];
		
	//2つ以上length-1以下のとき
	var val, inner_ret;
	while (1) {
		if (parsed.length === length) {
			ret.push(parsed);
			break;
		}
		val = [parsed.pop()];
		inner_ret = c(parsed, length - 1);
		let i2;
		for ( i2 = 0; i2 < inner_ret.length; ++i2) {
			ret.push(inner_ret[i2].concat(val));
		}
	}
	return ret;
};
