'use strict';

const riot = require('riot');

require('./tags/sudoku-field');

const environment_suitable = require('./lib/environment_check');

const LapTimer = require('./lib/lap_timer');

const $ = require('jquery');

const Solver = require('./lib/sat_solver');

const Constraints = require('./lib/sat_constraints');

const comb = require('./lib/combination');

$(() => {
  if (!environment_suitable) {
    alert('この環境ではJavaScriptの機能が不足していて、実行できません。');
    return;
  }
  const field = riot.mount('sudoku-field')[0];
  const $indicator = $('#indicator');
  const stopwatch = new LapTimer(function (mes) {
    return $('<p />').text(mes).appendTo($indicator);
  });
  const solver = new Solver;
  solver.loadWorker();
  $('#solve_btn').click(function () {
    stopwatch.start();
    const constraints = new Constraints;
    // 変数番号：row * 81 + col * 9 + num
    function toValueNum(row, col, num) {
      return row * 81 + col * 9 + (num - 0);
    }
    function fromValueNum(val) {
      const num = (val - 1) % 9 + 1;
      const row_col = (val - num) / 9;
      return [Math.floor(row_col / 9), row_col % 9, num];
    }
    const fieldData = field.data;
    // 変数位置のセット
    for(let r = 0; r < 9 ; ++r) {
      for(let c = 0; c < 9; ++c) {
        if(fieldData[r][c]) constraints.add(toValueNum(r, c, +fieldData[r][c]));
      }
    }
    // それ以外の条件生成

    for(let a = 0; a < 9; ++a){
      const start_row = Math.floor(a / 3) * 3;
      const start_col = (a % 3) * 3;
      for(let b = 0; b < 9; ++b){
        const cells = [];
        const rows = [];
        const cols = [];
        const blocks = [];
        for(let c = 0; c < 9; ++c){
          const row_in_block = Math.floor(c / 3);
          const col_in_block = c % 3;
          cells[c] = toValueNum(a, b, c + 1);
          rows[c] = toValueNum(a, c, b + 1);
          cols[c] = toValueNum(c, a, b + 1);
          blocks[c] = toValueNum(start_row + row_in_block, start_col + col_in_block, b + 1);
        }
        // 1つ以上
        constraints.add(cells);
        constraints.add(rows);
        constraints.add(cols);
        constraints.add(blocks);
        // 2つ未満
        comb(cells.map(x => -x), 2).forEach(arr => constraints.add(arr));
        comb(rows.map(x => -x), 2).forEach(arr => constraints.add(arr));
        comb(cols.map(x => -x), 2).forEach(arr => constraints.add(arr));
        comb(blocks.map(x => -x), 2).forEach(arr => constraints.add(arr));
      }
    }
    stopwatch.lap('立式');
    solver.solve(constraints, function(result_status, result_arr, stdout, stderr){
      stopwatch.lap('初回ソルバー');
      if(result_status !== 'SAT'){
        alert('解が見つかりませんでした。');
        return;
      }
      const trues = result_arr.filter((val) => val > 0);
      trues.forEach(val => {
        const [row, col, num] = fromValueNum(val);
        fieldData[row][col] = num;
      });
      field.update();
      stopwatch.lap('出力');
      constraints.add(trues.map(x => -x));
      solver.solve(constraints, function(result_status, result_arr, stdout, stderr){
        stopwatch.finish('別解チェック');
        alert(result_status === 'SAT' ? '別解があります。' : '一意解です。');
      });
    });
  });
});
