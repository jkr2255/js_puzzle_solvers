'use strict';

const $ = require('jquery');

const fieldClass = require('./lib/puzzle_field');

const environment_suitable = require('./lib/environment_check');

const timerClass = require('./lib/lap_timer');

const Constraints = require('./lib/sat_constraints');

const Solver = require('./lib/sat_solver');

const comb = require('./lib/combination');

$(function() {
  if (!environment_suitable) {
    alert('この環境ではJavaScriptの機能が不足していて、実行できません。');
    return;
  }
  const field = new fieldClass('#field');
  let inserted_nums = [0];
  const solver = new Solver;
  solver.loadWorker();
  $("#make_field_btn").click(function() {
    const temp_width = parseInt($('#width').val(), 10);
    const temp_height = parseInt($('#height').val(), 10);
    if (!(temp_width >= 2 && temp_height >= 2)) {
      alert('2×2以上で設定してください。');
      return;
    }
    field.setSize(temp_width, temp_height);
    inserted_nums = [0];
  });
  $("#make_field_btn").click();
  field.changeFunc = function(old_val, increase) {
    let val = +old_val;
    if (val === 0 && !increase) {
      return;
    }
    const step = increase ? 1 : -1;
    inserted_nums[val] -= 1;
    for(; ;) {
      val += step;
      if (!(inserted_nums[val] === 2 && val > 0)) {
        break;
      }
    }
    inserted_nums[val] || (inserted_nums[val] = 0);
    inserted_nums[val] += 1;
    return val || '';
  };
  const $indicator = $('#indicator');
  const stopwatch = new timerClass(function(mes) {
    return $('<p />').text(mes).appendTo($indicator);
  });
  $('#solve_btn').click(function() {
    stopwatch.start();
    const nums = {};
    let max_num = 0;
    field.eachCell(function(val) {
      val = +val;
      if (!val) {
        return;
      }
      nums[val] || (nums[val] = 0);
      nums[val] += 1;
      if (max_num < val) {
        max_num = val;
      }
    });
    if (max_num === 0) {
      alert('数字が1つもないので終了します。');
      return;
    }
    for (const _ in nums) {
      const count = nums[_];
      if (count !== 2) {
        alert('数字は2つずつ入れてください。');
        return;
      }
    }
    stopwatch.lap('条件チェック');
		//次に、制約式を立てる
    function pos2var(x, y, num) {
      return ((y * field.width) + x) * max_num + num;
    }
    function get_neighbors(x, y, num) {
      const ret = [];
      if (x > 0)
        ret.push(pos2var(x - 1, y, num));
      if (y > 0)
        ret.push(pos2var(x, y - 1, num));
      if (x < field.width - 1)
        ret.push(pos2var(x + 1, y, num));
      if (y < field.height - 1)
        ret.push(pos2var(x, y + 1, num));
      return ret;
    }
    const constraints = new Constraints;
    const no_kansai = new Constraints;
    field.eachCell(function(value, x, y){
      let num = +value;
      if (num) {
        //数字が入っているセル
        const neighbors = get_neighbors(x, y, num);
        //値確定の条件
        for ( let i = 1; i <= max_num; ++i) {
          let n = pos2var(x, y, i);
          if (i != num)
            n = -n;
          constraints.add(n);
        }
        //隣接マスのどこかに同じ値
        constraints.add(neighbors);
        //隣接マス2つに同じ値は入らない
        comb(neighbors, 2).forEach( (val) => (constraints.add([-val[0], -val[1]]), undefined));
      } else {
        let n = pos2var(x, y, 1), i;
        const same_cells = [];
        for ( i = 0; i < max_num; ++i) {
          same_cells.push(n + i);
        }
        // 同じマスに複数の数字が入らない
        comb(same_cells, 2).forEach((val) => (constraints.add([-val[0], -val[1]]), undefined));
        // 関西解を除外（一部の場合のみ発動）
        no_kansai.add(same_cells);
        for ( num = 1; num <= max_num; ++num) {
          const neighbors = get_neighbors(x, y, num);
          //もとから数字のないマスでは、隣接するマスのうち3マスに同じ数字が入ることはない
          let arr = comb(neighbors, 3);
          arr.forEach((val) => (constraints.add([-val[0], -val[1], -val[2]]), undefined));
          // ある数字が入っている場合に、隣接マスで同じ数字が入る個数はちょうど2つ
          n = pos2var(x, y, num);
          switch(neighbors.length) {
            case 3:
              arr = comb(neighbors, 2);
            // fall through
            case 4:
            // 4の場合はさっき作ったarrを流用
              arr.forEach((val) => (constraints.add([-n, ...val]), undefined));
              break;
            case 2:
              constraints.add([-n, neighbors[0]]);
              constraints.add([-n, neighbors[1]]);
              break;
          }
        }
      }
    });
    stopwatch.lap('立式');
    let first_constraints = constraints;
    if(!$("#initial_kansai").is(':checked')){
      first_constraints = Constraints.merge(constraints, no_kansai);
    }
    solver.solve(first_constraints, function(result_status, result_arr, stdout, stderr){
      stopwatch.lap('初回ソルバー');
      if(result_status !== 'SAT'){
        alert('解が見つかりませんでした。');
        return;
      }
      const trues = result_arr.filter((val) => val > 0);
      const table=[];
      let kansai = false;
      let x, y, i, num, flag;
      if(trues.length < (field.width * field.height)){
        alert('関西解です。');
        kansai=true;
      }
      //テーブルの準備
      for(y = 0; y< field.height; ++y){
        table.push([]);
      }
      for(i = 0; i<trues.length; ++i){
        num = (trues[i]-1) % max_num + 1;
        y = Math.floor((trues[i]-num) / max_num / field.width);
        x = (trues[i] - num)/max_num - y * field.width;
        table[y][x] = num;
      }
      // 罫線素片で表を埋める
      const parts = {};
      parts[ 3]='│';
      parts[ 5]='┌';
      parts[ 6]='└';
      parts[ 9]='┐';
      parts[10]='┘';
      parts[12]='─';
      y = 0;
      for(y=0;y<field.height;++y){
        for(x=0;x<field.width;++x){
          num = table[y][x];
          if(!num){
            field.setValue(x, y, '');
            continue;
          }
          flag=0;
          //左
          if((x > 0) && table[y][x-1] == num) flag +=8;
          //右
          if((x < field.width-1) && table[y][x+1] == num) flag +=4;
          //上
          if((y > 0) && table[y-1][x] == num) flag +=2;
          //下
          if((y<field.height-1) && table[y+1][x] == num) flag +=1;
          if(parts[flag]) field.setValue(x, y, parts[flag]);
        }
      }
      console.log(table);
      stopwatch.lap('出力');
			//別解チェック
      if(kansai){
        stopwatch.finish();
        return;
      }
      if($("#bypass_unique").is(':checked')) return;
      constraints.add(trues.map(x => -x));
      solver.solve(constraints, function(result_status, result_arr, stdout, stderr){
        stopwatch.finish('別解チェック');
        alert(result_status === 'SAT' ? '別解があります。' : '一意解です。');
      });
    });
  });
});
