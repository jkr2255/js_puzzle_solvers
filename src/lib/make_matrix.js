'use strict';

module.exports = function(width, height, initial) {
	var ret = [];
	var x, y;
	for ( y = 0; y < height; ++y) {
		ret.push([]);
		for ( x = 0; x < width; ++x) {
			ret[y].push(initial);
		}
	}
	return ret;
};
