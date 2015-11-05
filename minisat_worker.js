var Module={};
importScripts('minisat.js');
addEventListener('message',function(e){
	'use strict';

	var param = e.data;
	var solve_string = Module.cwrap('solve_string', 'string', ['string', 'int']);
	var ret_obj={result: '', stdout: '', stderr:''};
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
},false);
