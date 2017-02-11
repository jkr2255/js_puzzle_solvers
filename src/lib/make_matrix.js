'use strict';

module.exports = function(width, height, initial) {
  const ret = [];
  for (let y = 0; y < height; ++y) {
    ret.push([]);
    for (let x = 0; x < width; ++x) {
      ret[y].push(initial);
    }
  }
  return ret;
};
