'use strict';

const riot = require('riot');

require('./tags/akari-field');
require('./tags/indicator');

const environment_suitable = require('./lib/environment_check');

const $ = require('jquery');

const LapTimer = require('./lib/lap_timer');

const Solver = require('./lib/sat_solver');

const Constraints = require('./lib/sat_constraints');

const comb = require('./lib/combination');

const make_matrix = require('./lib/make_matrix');

const setImmediate = require('./lib/set_immediate');

$(() => {
  if (!environment_suitable) {
    alert('この環境ではJavaScriptの機能が不足していて、実行できません。');
    return;
  }
  const field = riot.mount('akari-field')[0];
  const indicator = riot.mount('indicator')[0];
  const stopwatch = new LapTimer(indicator.log.bind(indicator));
  const solver = new Solver;
  solver.loadWorker();
  $('#solve_btn').click(function () {
    indicator.clear();
    stopwatch.start();
    field.creating = false;
    field.update();
    const {width, height} = field;
    function pos2num(row, col) {
      return row * width + (+col) + 1;
    }
    function num2pos(num){
      const row = ((num - 1) / width) | 0;
      const col = num - row * width;
      return {row, col};
    }
    const horizontalRange = make_matrix(width, height, null);
    const verticalRange = make_matrix(width, height, null);
    const constraints = new Constraints;
    // 連続の範囲内で1つ、という条件設定
    function terminate(arr) {
      if(!arr || arr.length <= 1) return;
      comb(arr.map(x => -x), 2).forEach(r => constraints.add(r));
    }
    // 横方向
    for(let row = 0; row < height; ++row) {
      let arr = null;
      for(let col = 0; col < width; ++col) {
        if(field.data[row][col] > 0) {
          terminate(arr);
          arr = null;
          continue;
        }
        if(arr === null) arr = [];
        arr.push(pos2num(row, col));
        horizontalRange[row][col] = arr;
      }
      terminate(arr);
    }

    // 縦方向
    for(let col = 0; col < width; ++col) {
      let arr = null;
      for(let row = 0; row < height; ++row) {
        if(field.data[row][col] > 0) {
          terminate(arr);
          arr = null;
          continue;
        }
        if(arr === null) arr = [];
        arr.push(pos2num(row, col));
        verticalRange[row][col] = arr;
      }
      terminate(arr);
    }
    // セルごとにチェック
    function neighbor_nums(row, col) {
      const row_shift = [1, 0, -1, 0];
      const col_shift = [0, 1, 0, -1];
      const ret = [];
      for(let i = 0; i < 4 ; ++i) {
        const new_row = row + row_shift[i];
        const new_col = col + col_shift[i];
        if(0 <= new_row && new_row < height && 0 <= new_col && new_col < width) {
          ret.push(pos2num(new_row, new_col));
        }
      }
      return ret;
    }
    for(let row = 0; row < height; ++row) {
      for(let col = 0; col < width; ++col) {
        const num = +field.data[row][col];
        if(num > 0) {
          // このマスには入らない
          constraints.add(-pos2num(row, col));
          // 数字なし
          if(num == 6) continue;
          const neighbors = neighbor_nums(row, col);
          const real_num = (num === 5) ? 0 : num;
          if(real_num > neighbors.length) {
            alert('数字がおかしいです。');
            return;
          }
          if(real_num > 0) {
            // 入るマス
            comb(neighbors, neighbors.length - real_num + 1).forEach(x => constraints.add(x));
          }
          if(real_num < neighbors.length) {
            // 入らないマス
            comb(neighbors.map(x => -x), real_num+1).forEach(x => constraints.add(x));
          }
        } else{
          // セルの条件を集める
          constraints.add(
            horizontalRange[row][col].concat(verticalRange[row][col])
                                     .filter((x, i, self) => self.indexOf(x) === i)
          );
        }
      }
    }
    stopwatch.lap('立式');
    solver.solve(constraints, function(result_status, result_arr, stdout, stderr){
      stopwatch.lap('初回ソルバー');
      if(result_status !== 'SAT'){
        alert('解が見つかりませんでした。');
        return;
      }
      const true_hash = {};
      result_arr.forEach(val => val > 0 && (true_hash[val] = true));
      function updateField(hash){
        for(let row = 0; row < height; ++row) {
          for(let col = 0; col < width; ++col) {
            if(field.data[row][col] > 0) continue;
            field.data[row][col] = hash[pos2num(row, col)] ? -1 : 0;
          }
        }
        field.update();
      }
      updateField(true_hash);
      stopwatch.lap('出力');
      constraints.add(Object.keys(true_hash).map(x => -x));
      solver.solve(constraints, function(result_status, result_arr, stdout, stderr){
        if(result_status !== 'SAT') {
          stopwatch.finish('別解チェック');
          alert( '一意解です。');
          return;
        }
        if($('#others_reset').is(':checked')){
          stopwatch.finish('別解チェック');
          alert('別解があります。');
          updateField({});
          field.update();
          return;
        }
        // 判明する限りのマスを埋める
        stopwatch.lap('確定マスの抽出');
        let matchedCells = result_arr.filter((val) => val > 0 && true_hash[val]);
        constraints.add(matchedCells.map(x => -x));
        setImmediate(() => {
          const obj = {};
          matchedCells.forEach(x => obj[x] = true);
          updateField(obj);
          field.update();
        });
        solver.solve_loop(constraints, function(_, result_status, result_arr, stdout, stderr){
          if(result_status === 'UNSAT') {
            stopwatch.finish('完了');
            alert('別解があります。');
            return false;
          }
          matchedCells = result_arr.filter((val) => val > 0 && matchedCells.indexOf(val) !== -1);
          if(matchedCells.length === 0) {
            stopwatch.finish('完了');
            updateField({});
            field.update();
            alert('別解があります。');
            return false;
          }
          stopwatch.lap('確定マスの抽出');

          setImmediate(() => {
            const obj = {};
            matchedCells.forEach(x => obj[x] = true);
            updateField(obj);
            field.update();
          });
          constraints.add(matchedCells.map(x => -x));
          return constraints;
        });

      });
    });

  });
});
