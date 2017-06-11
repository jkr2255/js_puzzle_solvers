'use strict';

// IE8は他の要因で動かないので、気にしない

module.exports = (func) => document.addEventListener("DOMContentLoaded", func, false);
