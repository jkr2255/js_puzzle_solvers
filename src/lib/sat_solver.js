'use strict';

const SatConstraints = require('./sat_constraints');

class SatSolver{

  loadWorker(){
    this.worker = new Worker('gen/minisat_worker.js');
  }

  /**
   * @param {function(string, Array<number>, string, string): any} func
   */
  setListener(func){
    if(!this.worker){
      this.loadWorker();
    }
    if(this.listener){
      this.worker.removeEventListener('message', this.listener, true);
    }
    this.listener = function(e) {
      const result = e.data.result;
      let result_arr = null;
      let result_status = 'ERROR';

      if (result) {
        result_arr = result.split(' ');
        result_status = result_arr.shift();
        result_arr = result_arr.map(x => +x);
      }
      func(result_status, result_arr, e.data.stdout, e.data.stderr);
    };
    this.worker.addEventListener('message', this.listener, true);
  }

  /**
   * @param {function(string, Array<number>, string, string): any} callback
   */
  solve(constraints, callback){
    const dimac_text = constraints.toDIMACS();
    this.setListener(callback);
    this.worker.postMessage(dimac_text);
  }

	//コールバックの返り値:falseならループ終了、SatConstraintsならそれをもとに次のループへ
	//とりあえずそれ以外はTypeError
  /**
   * @param {function(SatConstraints, string, Array<number>, string, string)} callback
   */
  solve_loop(constraints, callback){
    this.setListener((result_status, result_arr, stdout, stderr) => {
      const ret = callback(constraints, result_status, result_arr, stdout, stderr);
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

}

module.exports = SatSolver;
