'use strict';
const Module=self.Module={};
/* globals importScripts */
importScripts('../bin/minisat.js');
addEventListener('message', function(e){
  const param = e.data;
  const solve_string = Module.cwrap('solve_string', 'string', ['string', 'int']);
  const ret_obj={result: '', stdout: '', stderr:''};
  Module['print'] = function(x) {
    ret_obj.stdout += x + "\n";
  };
  Module['printErr'] = function(x) {
    ret_obj.stderr += x + "\n";
  };
  try {
    ret_obj.result = solve_string(param, param.length);
  } catch(e) {
    Module.printErr('Error: ' + e);
  }
  self.postMessage(ret_obj);
}, false);
