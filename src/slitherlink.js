/// <reference path="../typings/n-dimensional-flood-fill.d.ts" />

'use strict';

var $ = require('jquery');

var environment_suitable = require('./lib/environment_check');

var LapTimer = require('./lib/lap_timer');

var Constraints = require('./lib/sat_constraints');

var _each = require('lodash/collection/each');

var Solver = require('./lib/sat_solver');

var _map = require('lodash/collection/map');

var _uniq = require('lodash/array/uniq');

var _diff = require('lodash/array/difference');

var set_immediate = require('./lib/set_immediate');

var comb = require('./lib/combination');

var make_matrix = require('./lib/make_matrix');

var floodFill = require('n-dimensional-flood-fill');


$(function () {
	if (!environment_suitable) {
		alert('この環境ではJavaScriptの機能が不足していて、実行できません。');
		return;
	}
	var solver = new Solver;
	var width, height;
	var $field = $('#field');
	//サイズ設定
	$("#make_field_btn").click(function () {
		var temp_width, temp_height, i, j, $tr, $div;
		temp_width = parseInt($('#width').val(), 10);
		temp_height = parseInt($('#height').val(), 10);
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
		var $elem = $(this);
		var val = $elem.text();
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
		var $elem = $(this);
		var val = $elem.text();
		if (val === '') {
			val = '3';
		} else {
			val -= 1;
			if (val === -1)
				val = '';
		}
		$elem.text(val);
	});
	var $indicator = $('#indicator');
	var stopwatch = new LapTimer(function (mes) {
		return $('<p />').text(mes).appendTo($indicator);
	});
	//ソルバー始動
	$('#solve_btn').click(function() {
		var non_zeros = {}, non_zero_count = 0;
		stopwatch.start();
		var constraints = new Constraints;
		//まずは定式化
		//変数は「内側」がtrueで進める
		//(幅+2)*y+x+1
		var x, y, current, val;
		var neighbors, arr;
		function pos_var(x, y) {
			return (width + 2) * y + x + 1;
		}
		for ( y = 0; y <= height + 1; ++y) {
			for ( x = 0; x <= width + 1; ++x) {
				//まず、ダミーの場合を先に判定
				current = pos_var(x, y);
				if (!x || !y || (x == width + 1) || (y == height + 1)) {
					constraints.add(-current);
					continue;
				}
				//周囲4つとも違う、ということはない
				neighbors = [pos_var(x, y + 1), pos_var(x, y - 1), pos_var(x + 1, y), pos_var(x - 1, y)];
				constraints.add(neighbors.concat([-current]))
					.add(_map(neighbors, x => -x).concat([current]));
				//2*2のブロックで、X字状に2つずつになることはない
				//左端、上端は省略
				if (x > 1 && y > 1) {
					constraints.add([current, pos_var(x - 1, y - 1), -pos_var(x, y - 1), -pos_var(x - 1, y)])
						.add([-current, -pos_var(x - 1, y - 1), pos_var(x, y - 1), pos_var(x - 1, y)]);
				}
				//数字が入る場合の処理
				val = $("#cell_" + x + '_' + y).text();
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
					arr = comb(neighbors, 2);
					_each(arr, (pair) => {
						constraints.add(pair.concat([-current]))
							.add([current, -pair[0], -pair[1]]);
					});
					constraints.add(neighbors)
						.add([-neighbors[0], -neighbors[1], -neighbors[2], -neighbors[3]]);
				} else if (val === '2') {
					arr = comb(neighbors, 3);
					_each(arr, (pair) => {
						constraints.add(pair)
							.add([-pair[0], -pair[1], -pair[2]]);
					});
				} else if (val === '3') {
					arr = comb(neighbors, 2);
					_each(arr, (pair) => {
						constraints.add(pair.concat([current]))
							.add([-current, -pair[0], -pair[1]]);
					});
				}
			}
		}
		stopwatch.lap('立式');
		function result2matrix(result_arr){
			var ret = make_matrix(width + 2, height + 2, 0);
			var i, l, x, y;
			for(i=0,l=result_arr.length;i<l;++i){
				if(result_arr[i]<0) continue;
				y = Math.floor((result_arr[i] - 1) / (width + 2));
				x = result_arr[i] - 1 - y * (width + 2);
				ret[y][x] = 1;
			}
			return ret;
		}
		function set_display(matrix) {
			set_immediate(function(){
				var x, y = 1;
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
			var whites=[], blacks=[];
			var checked = make_matrix(width + 2, height + 2, false);
			var x=1,y=1;
			var getter = (x,y) => matrix[y][x];
			var onFlood = (x,y) => checked[y][x] = true;
			var added = false;
			function posvars(seed){
				return _map(
					floodFill({getter, seed, onFlood}).flooded,
					(arr) => pos_var(arr[0],arr[1])
				);
			}
			function linked(pos_arr){
				var arr=[];
				var min=pos_var(1,2);
				var max = pos_var(width,height-1);
				for(var i=0, l=pos_arr.length; i<l;++i){
					var val = pos_arr[i];
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
				return _diff(_uniq(arr),pos_arr);
			}
			whites.push(posvars([0,0]));
			//番兵の分はすでに上で処理済み
			for(y = 1; y <= height; ++y){
				for(x = 1; x <= width; ++x){
					if(checked[y][x])continue;
					if(matrix[y][x]){
						blacks.push(posvars([x,y]));
					}else{
						whites.push(posvars([x,y]));
					}
				}
			}
			//console.log(blacks, whites);
			if(whites.length > 1){
				added = true;
				//不適当なのは外側に繋がらないもの、と明確
				whites.shift();
				_each(whites,function(white){
					var linked_cells = linked(white);
					constraints.add(white.concat(_map(linked_cells, x=>-x)));
				});
			}
			if(blacks.length > 1){
				added = true;
				_each(blacks,function(black){
					var linked_cells = linked(black);
					constraints.add(linked_cells.concat(_map(black, x=>-x)));
				});
			}
			return added;
		}
		var first_found = null;
		solver.solve_loop(constraints,function(ret_constraints, result_status, result_arr){
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
			var matrix = result2matrix(result_arr);
			set_display(matrix);
			var separated = check_separated(matrix, ret_constraints);
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
			ret_constraints.add(_map(result_arr, x=> -x));
			return ret_constraints;
		});
	});	
});
