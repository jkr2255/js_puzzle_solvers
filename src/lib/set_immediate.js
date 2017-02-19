
'use strict';

const timeouts = [];

const messageName = "set_timeout_" + (Math.random());

function setImmediate(func) {
  timeouts.push(func);
  window.postMessage(messageName, '*');
  return null;
}

window.addEventListener('message', function(event) {
  if (event.source === window && event.data === messageName) {
    event.stopPropagation();
    if (timeouts.length > 0) {
      timeouts.shift()();
    }
  }
}, true);

module.exports = setImmediate;
