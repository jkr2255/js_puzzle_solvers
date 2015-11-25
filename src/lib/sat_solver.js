'use strict';

var SatConstraints = require('./sat_constraints');

var _map = require('lodash/collection/map');

class SatSolver{

	loadWorker(){
		this.worker = new Worker('gen/minisat_worker.js');
	}
	
	setListener(func){
		if(!this.worker){
			this.loadWorker();
		}
		if(this.listener){
			this.worker.removeEventListener('message',this.listener, true);
		}
		this.listener = function(e) {
			var result = e.data.result;
			var result_arr = null;
			var result_status = 'ERROR';
			
			if (result) {
				result_arr = result.split(' ');
				result_status = result_arr.shift();
				result_arr = _map(result_arr, x => +x);
			}
			func(result_status, result_arr, e.data.stdout, e.data.stderr);
		}
		this.worker.addEventListener('message',this.listener, true);
	}
	
	solve(constraints, callback){
		var dimac_text = constraints.toDIMACS();
		this.setListener(callback);
		this.worker.postMessage(dimac_text);
	}
	
	//コールバックの返り値:falseならループ終了、SatConstraintsならそれをもとに次のループへ
	//とりあえずそれ以外はTypeError
	solve_loop(constraints, callback){
		this.setListener((result_status, result_arr, stdout, stderr) => {
			var ret = callback(constraints, result_status, result_arr, stdout, stderr);
			if (ret === false){
				return;
			}
			if (ret instanceof SatConstraints){
				constraints = ret;
				this.worker.postMessage(ret.toDIMACS());
				return;
			}
			throw new TypeError;
		});
		this.worker.postMessage(constraints.toDIMACS());
	}
	
};

module.exports = SatSolver;
