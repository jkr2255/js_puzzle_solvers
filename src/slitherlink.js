/// <reference path="../typings/n-dimensional-flood-fill.d.ts" />

'use strict';

const $ = require('jquery');

const environment_suitable = require('./lib/environment_check');

const LapTimer = require('./lib/lap_timer');

const Constraints = require('./lib/sat_constraints');

const Solver = require('./lib/sat_solver');

const _uniq = require('lodash/array/uniq');

const _diff = require('lodash/array/difference');

const set_immediate = require('./lib/set_immediate');

const comb = require('./lib/combination');

const make_matrix = require('./lib/make_matrix');

const floodFill = require('n-dimensional-flood-fill');


$(function () {
  if (!environment_suitable) {
    alert('この環境ではJavaScriptの機能が不足していて、実行できません。');
    return;
  }
  const solver = new Solver;
  let width, height;
  const $field = $('#field');
	//サイズ設定
  $("#make_field_btn").click(function () {
    let i, j, $tr, $div;
    const temp_width = parseInt($('#width').val(), 10);
    const temp_height = parseInt($('#height').val(), 10);
    if (!(temp_width >= 2 && temp_height >= 2)) {
      alert('2×2以上で設定してください。');
      return;
    }
    $field.empty();
    width = temp_width;
    height = temp_height;
		//外側の番兵を考慮して、1オリジン
    for (i = 1; i <= height; ++i) {
      $tr = $('<tr />');
      for (j = 1; j <= width; ++j) {
        $div = $('<div />');
        $div.attr({
          id: 'cell_' + j + '_' + i,
          class: 'cell'
        });
        $tr.append($div.wrap('<td />').parent());
      }
      $field.append($tr);
    }
  }).click();
	//内容の変更
  $field.on('click', '.cell', function () {
    const $elem = $(this);
    let val = $elem.text();
    if (val === '') {
      val = '0';
    } else {
      val = +val + 1;
      if (val === 4)
        val = '';
    }
    $elem.text(val);
  });
	//内容の変更
  $field.on('contextmenu', '.cell', function (e) {
    e.preventDefault();
    const $elem = $(this);
    let val = $elem.text();
    if (val === '') {
      val = '3';
    } else {
      val -= 1;
      if (val === -1)
        val = '';
    }
    $elem.text(val);
  });
  const $indicator = $('#indicator');
  const stopwatch = new LapTimer(function (mes) {
    return $('<p />').text(mes).appendTo($indicator);
  });
	//ソルバー始動
  $('#solve_btn').click(function() {
    const non_zeros = {};
    let  non_zero_count = 0;
    stopwatch.start();
    const constraints = new Constraints;
		//まずは定式化
		//変数は「内側」がtrueで進める
		//(幅+2)*y+x+1
    function pos_var(x, y) {
      return (width + 2) * y + x + 1;
    }
    for (let y = 0; y <= height + 1; ++y) {
      for (let x = 0; x <= width + 1; ++x) {
				//まず、ダミーの場合を先に判定
        const current = pos_var(x, y);
        if (!x || !y || (x == width + 1) || (y == height + 1)) {
          constraints.add(-current);
          continue;
        }
				//周囲4つとも違う、ということはない
        const neighbors = [pos_var(x, y + 1), pos_var(x, y - 1), pos_var(x + 1, y), pos_var(x - 1, y)];
        constraints.add(neighbors.concat([-current]))
					.add(neighbors.map( x => -x).concat([current]));
				//2*2のブロックで、X字状に2つずつになることはない
				//左端、上端は省略
        if (x > 1 && y > 1) {
          constraints.add([current, pos_var(x - 1, y - 1), -pos_var(x, y - 1), -pos_var(x - 1, y)])
						.add([-current, -pos_var(x - 1, y - 1), pos_var(x, y - 1), pos_var(x - 1, y)]);
        }
				//数字が入る場合の処理
        const val = $("#cell_" + x + '_' + y).text();
        if (val === '')
          continue;
        if (val === '0') {
					//5つで条件を満たせる
          constraints.add([current, -neighbors[0]])
						.add([neighbors[0], -neighbors[1]])
						.add([neighbors[1], -neighbors[2]])
						.add([neighbors[2], -neighbors[3]])
						.add([neighbors[3], -current]);
          continue;
        }
				//0以外をカウント
        ++non_zero_count;
        non_zeros[current] = val;
        if (val === '1') {
          comb(neighbors, 2).forEach((pair) => {
            constraints.add(pair.concat([-current]))
							.add([current, -pair[0], -pair[1]]);
          });
          constraints.add(neighbors)
						.add([-neighbors[0], -neighbors[1], -neighbors[2], -neighbors[3]]);
        } else if (val === '2') {
          comb(neighbors, 3).forEach((pair) => {
            constraints.add(pair)
							.add([-pair[0], -pair[1], -pair[2]]);
          });
        } else if (val === '3') {
          comb(neighbors, 2).forEach((pair) => {
            constraints.add(pair.concat([current]))
							.add([-current, -pair[0], -pair[1]]);
          });
        }
      }
    }
    stopwatch.lap('立式');
    function result2matrix(result_arr){
      const ret = make_matrix(width + 2, height + 2, 0);
      let i, l, x, y;
      for(i=0, l=result_arr.length;i<l;++i){
        if(result_arr[i]<0) continue;
        y = Math.floor((result_arr[i] - 1) / (width + 2));
        x = result_arr[i] - 1 - y * (width + 2);
        ret[y][x] = 1;
      }
      return ret;
    }
    function set_display(matrix) {
      set_immediate(function(){
        let x, y = 1;
        $field.find('td').removeClass('inside border-top');
        $field.find('tr').each(function() {
          x = 1;
          $(this).find('td').each(function() {
            if (matrix[y][x])
              this.classList.add('inside');
            if (y > 1 && (matrix[y][x] != matrix[y-1][x])) {
              this.classList.add('border-top');
            }
            ++x;
          });
          ++y;
        });
      });
    }
    function check_separated(matrix, constraints){
      const whites=[], blacks=[];
      const checked = make_matrix(width + 2, height + 2, false);
      let x=1, y=1;
      const getter = (x, y) => matrix[y][x];
      const onFlood = (x, y) => checked[y][x] = true;
      let added = false;
      function posvars(seed){
        return floodFill({getter, seed, onFlood}).flooded.map(
					(arr) => pos_var(arr[0], arr[1])
				);
      }
      function linked(pos_arr){
        const arr=[];
        const min=pos_var(1, 2);
        const max = pos_var(width, height-1);
        for(let i=0, l=pos_arr.length; i<l;++i){
          const val = pos_arr[i];
					//上
          if(val >= min) arr.push(val-(width+2));
					//下
          if (val <= max) arr.push(val+width+2);
					//左
          if (val % (width+2) !== 2)
            arr.push(val-1);
					//右
          if (val % (width+2) !== (width+1))
            arr.push(val + 1);
        }
        return _diff(_uniq(arr), pos_arr);
      }
      whites.push(posvars([0, 0]));
			//番兵の分はすでに上で処理済み
      for(y = 1; y <= height; ++y){
        for(x = 1; x <= width; ++x){
          if(checked[y][x])continue;
          if(matrix[y][x]){
            blacks.push(posvars([x, y]));
          }else{
            whites.push(posvars([x, y]));
          }
        }
      }
			//console.log(blacks, whites);
      if(whites.length > 1){
        added = true;
				//不適当なのは外側に繋がらないもの、と明確
        whites.shift();
        whites.forEach(function(white){
          const linked_cells = linked(white);
          constraints.add(white.concat(linked_cells.map(x=>-x)));
        });
      }
      if(blacks.length > 1){
        added = true;
        blacks.forEach(function(black){
          const linked_cells = linked(black);
          constraints.add(linked_cells.concat(black.map(x=>-x)));
        });
      }
      return added;
    }
    let first_found = null;
    solver.solve_loop(constraints, function(ret_constraints, result_status, result_arr){
      stopwatch.lap('ソルバー');
      if(result_status !== 'SAT'){
        stopwatch.finish();
        if(first_found){
          alert('一意解です。');
          set_display(first_found);
        }else{
          alert('解が見つかりませんでした。');
        }
        return false;
      }
      const matrix = result2matrix(result_arr);
      set_display(matrix);
      const separated = check_separated(matrix, ret_constraints);
      stopwatch.lap('ループチェック');
      if(separated){
        return ret_constraints;
      }
      if(first_found){
        stopwatch.finish();
        alert('別解がありました。');
        return false;
      }
			// 別解探索へ
      first_found = matrix;
      ret_constraints.add(result_arr.map(x=> -x));
      return ret_constraints;
    });
  });
});
