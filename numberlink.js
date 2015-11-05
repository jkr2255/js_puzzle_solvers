/**
Numberlink.js

Copyright (c) 2015 Jkr2255

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
*/// 表示処理
jQuery(function($) {
	'use strict';
	// 動作環境チェック
	if(typeof Worker !== 'function' || typeof Int32Array !== 'function'){
		alert('この環境ではJavaScriptの機能が不足していて、実行できません。');
	}
	var width, height;
	var $field = $('#field');
	var inserted_nums = [0];
	$("#make_field_btn").click(function() {
		var temp_width, temp_height, i, j, $tr;
		temp_width = parseInt($('#width').val(), 10);
		temp_height = parseInt($('#height').val(), 10);
		if (!(temp_width >= 2 && temp_height >= 2)) {
			alert('2×2以上で設定してください。');
			return;
		}
		$field.empty();
		width = temp_width;
		height = temp_height;
		for ( i = 0; i < height; ++i) {
			$tr = $('<tr />');
			for ( j = 0; j < width; ++j) {
				$tr.append('<td />');
			}
			$field.append($tr);
		}
		inserted_nums = [0];
	}).click();
	$field.on('click', 'td', function(e) {
		e.preventDefault();
		var $td = $(this);
		var val = +$td.text() || 0;
		inserted_nums[val]--;
		do {
			val++;
		} while(inserted_nums[val] == 2);
		$td.text(val);
		inserted_nums[val] ? inserted_nums[val]++ : inserted_nums[val] = 1;
	});
	$field.on('contextmenu', 'td', function(e) {
		e.preventDefault();
		var $td = $(this);
		var val = +$td.text();
		if (!val)
			return;
		inserted_nums[val]--;
		do {
			val--;
		} while(inserted_nums[val] == 2 && val > 0);
		$td.text(val || '');
		inserted_nums[val] ? inserted_nums[val]++ : inserted_nums[val] = 1;
	});
	// データ処理
	$('#solve_btn').click(function() {
		var start_time = $.now();
		var checkpoint_time = start_time;
		var lap_time;
		function lap(text){
			lap_time = $.now();
			$indicator.append('<p>'+text+'：'+(lap_time-checkpoint_time)+'ミリ秒</p>');
			checkpoint_time = lap_time;
		}
		var $indicator= $('#indicator');
		//まずは数だけ数える
		var nums = {};
		var max_num = 0;
		$field.find('tr').each(function() {
			var $tr = $(this);
			$tr.find('td').each(function() {
				var num = +$(this).text();
				if (!num)
					return;
				if (max_num < num)
					max_num = num;
				nums[num] ? nums[num]++ : (nums[num] = 1);
			});
		});
		for (var i in nums) {
			if (nums[i] != 2) {
				alert('数字は2つずつ入れてください。');
				return;
			}
		}
		if (max_num == 0) {
			alert('数字が1つもないので終了します。');
		}
		lap('条件チェック');
		//次に、制約式を立てる
		function pos2var(x, y, num) {
			return ((y * width) + x) * max_num + num;
		}

		function get_neighbors(x, y, num) {
			var ret = [];
			if (x > 0)
				ret.push(pos2var(x - 1, y, num));
			if (y > 0)
				ret.push(pos2var(x, y - 1, num));
			if (x < width - 1)
				ret.push(pos2var(x + 1, y, num));
			if (y < height - 1)
				ret.push(pos2var(x, y + 1, num));
			return ret;
		}

		var x, y = 0;
		var constraints = [];
		var no_kansai = [];
		$field.find('tr').each(function() {
			x = 0;
			$(this).find('td').each(function() {
				var num = +$(this).text();
				var i, n, neighbors, arr, arr2;
				if (num) {
					neighbors = get_neighbors(x, y, num);
					//値確定の条件
					for ( i = 1; i <= max_num; ++i) {
						n = pos2var(x, y, i);
						if (i != num)
							n = -n;
						constraints.push(n + " 0");
					}
					//隣接マスのどこかに同じ値
					constraints.push(neighbors.join(' ') + ' 0');
					//隣接マス2つに同じ値は入らない
					arr = Util.combination(neighbors, 2);
					for ( i = 0; i < arr.length; ++i) {
						constraints.push(-arr[i][0] + ' ' + (-arr[i][1]) + ' 0');
					}
				} else {
					// 同じマスに複数の数字が入らない
					arr = [];
					n = pos2var(x, y, 1);
					for ( i = 0; i < max_num; ++i) {
						arr.push(n + i);
					}
					arr2 = Util.combination(arr, 2);
					for ( i = 0; i < arr2.length; ++i) {
						constraints.push(-arr2[i][0] + ' ' + (-arr2[i][1]) + ' 0');
					}
					// 関西解を除外（一部の場合のみ発動）
					no_kansai.push(arr.join(' ')+' 0');
					for ( num = 1; num <= max_num; ++num) {
						neighbors = get_neighbors(x, y, num);
						//もとから数字のないマスでは、隣接するマスのうち3マスに同じ数字が入ることはない
						arr = Util.combination(neighbors, 3);
						for ( i = 0; i < arr.length; ++i) {
							constraints.push(-arr[i][0] + ' ' + (-arr[i][1]) + ' ' + (-arr[i][2]) + ' 0');
						}
						// ある数字が入っている場合に、隣接マスで同じ数字が入る個数はちょうど2つ
						n = pos2var(x, y, num);
						switch(neighbors.length) {
						case 3:
							arr = Util.combination(neighbors, 2);
							// 意図的にフォールスルー
						case 4:
							// 4の場合はさっき作ったarrを流用
							for ( i = 0; i < arr.length; ++i) {
								constraints.push([-n].concat(arr[i]).join(' ') + ' 0');
							}
							break;
						case 2:
							constraints.push(-n + ' ' + neighbors[0] + ' 0');
							constraints.push(-n + ' ' + neighbors[1] + ' 0');
							break;
						}
					}
				}
				x++;
			});
			y++;
		});
		lap('立式');
		var first_constraints = constraints;
		if(!$("#initial_kansai").is(':checked')){
			first_constraints = constraints.concat(no_kansai);
		}
		Util.sat_solve(width * height * max_num, first_constraints , function(trues){
			lap('初回ソルバー');

			var table=[];
			var kansai = false;
			var x,y, i, num, flag;
			if(!trues){
				alert('解が見つかりませんでした。');
				return;
			}
			if(trues.length < (width * height)){
				alert('関西解です。');
				kansai=true;
			}
			//テーブルの準備
			for(y = 0; y< height; ++y){
				table.push([]);
			}
			for(i = 0; i<trues.length; ++i){
				num = (trues[i]-1) % max_num + 1;
				y = Math.floor((trues[i]-num) / max_num / width);
				x = (trues[i] - num)/max_num - y * width;
				table[y][x] = num;
			}
			// 罫線素片で表を埋める
			var parts = {};
			parts[ 3]='│';
			parts[ 5]='┌';
			parts[ 6]='└';
			parts[ 9]='┐';
			parts[10]='┘';
			parts[12]='─';
			y = 0;
			$field.find('tr').each(function() {
				x=0;
				$(this).find('td').each(function() {
					num = table[y][x];
					if(!num){
						$(this).text('');
						x++;
						return;
					}
					flag=0;
					//左
					if((x > 0) && table[y][x-1] == num) flag +=8;
					//右
					if((x < width-1) && table[y][x+1] == num) flag +=4;
					//上
					if((y > 0) && table[y-1][x] == num) flag +=2;
					//下
					if((y<height-1) && table[y+1][x] == num) flag +=1;
					if(parts[flag]) $(this).text(parts[flag]);
					x++;
				});
				y++;
			});
			console.log(table);
			lap('出力');
			//別解チェック
			if(kansai) return;
			if($("#bypass_unique").is(':checked')) return;
			var arr=[];
			for(i=0;i<trues.length; ++i){
				arr.push(-trues[i]);
			}
			constraints.push(arr.join(' ')+' 0');
			Util.sat_solve(width * height * max_num, constraints, function(trues){
				lap('別解チェック');
				alert(trues ? '別解があります。' : '一意解です。');
			});
		});
	});
});

