'use strict';

var $ = require('jquery');

var PuzzleField = require('./lib/puzzle_field');

var environment_suitable = require('./lib/environment_check');

var LapTimer = require('./lib/lap_timer');

var Constraints = require('./lib/sat_constraints');

var _each = require('lodash/collection/each');

var Solver = require('./lib/sat_solver');

var _map = require('lodash/collection/map');

var set_immediate = require('./lib/set_immediate');

var comb = require('./lib/combination');

var _fill = require('lodash/array/fill');

$(function () {
  'use strict';
  if (!environment_suitable) {
    alert('この環境ではJavaScriptの機能が不足していて、実行できません。');
    return;
  }
  var field = new PuzzleField('#field');
  var solver = new Solver;
  solver.loadWorker();
  $("#make_field_btn").click(function () {
    var temp_height, temp_width;
    temp_width = parseInt($('#width').val(), 10);
    temp_height = parseInt($('#height').val(), 10);
    if (!(temp_width >= 2 && temp_height >= 2)) {
      alert('2×2以上で設定してください。');
      return;
    }
    field.setSize(temp_width, temp_height);
  });
  $("#make_field_btn").click();
  field.changeFunc = function (old_val, increase) {
    //increaseでは空きマス→○→●→空きマスと遷移
    if (increase) {
      switch (old_val) {
        case '○':
          return '●';
        case '●':
          return '';
        default:
          return '○';
      }
    } else {
      switch (old_val) {
        case '○':
          return '';
        case '●':
          return '○';
        default:
          return '●';
      }
    }
  };
  var $indicator = $('#indicator');
  var stopwatch = new LapTimer(function (mes) {
    return $('<p />').text(mes).appendTo($indicator);
  });
  $('#solve_btn').click(function () {
    var width = field.width, height = field.height;
    stopwatch.start();
    var constraints = new Constraints;
    //条件変数：
    //横線：1〜h(w-1)
    //縦線：h(w-1)+1〜h(w-1)+w(h-1)
    //横方向を内側のループで回すように
    function get_variable_num(x, y, is_vertical) {
      //number型に決め打つための変換
      var num_x = +x;
      y = +y;
      if (x < 0 || x >= width || y < 0 || y >= height) {
        throw new RangeError;
      }
      if (is_vertical) {
        if (y === height - 1) throw new RangeError;
        return height * (width - 1) + width * y + num_x + 1;
      } else {
        if (x === width - 1) throw new RangeError;
        return (width - 1) * y + num_x + 1;
      }
    }
    function pos_from_variable_num(var_num) {
      var x = 0, y = 0;
      var_num = + var_num;
      if (var_num <= 0) throw new RangeError;
      if (var_num <= height * (width - 1)) {
        //横線
        x = (var_num - 1) % (width - 1);
        y = (var_num - 1 - x) / (width - 1);
        return { x, y, is_vertical: false };
      } else {
        //縦線
        var_num -= height * (width - 1);
        x = (var_num - 1) % width;
        y = (var_num - 1 - x) / width;
        return { x, y, is_vertical: true };
      }
    }
    //あるマスにつながる最大4本の線のID配列
    function get_cell_lines(x, y) {
      var ret = [];
      //上
      if (y > 0) {
        ret.push(get_variable_num(x, y - 1, true));
      }
      //下
      if (y < height - 1) {
        ret.push(get_variable_num(x, y, true));
      }
      //左
      if (x > 0) {
        ret.push(get_variable_num(x - 1, y, false));
      }
      //右
      if (x < width - 1) {
        ret.push(get_variable_num(x, y, false));
      }
      return ret;
    }
    var mashu_count = 0;
    field.eachCell(function (val, x, y) {
      var i = 0;
      //まず、フィールド全体にかかる制約
      var lines = get_cell_lines(x, y);
      // 2本以下
      _each(comb(lines, 3), arr => (constraints.add([-arr[0], -arr[1], -arr[2]]), undefined));
      // 1本にならない
      for (i = 0; i < lines.length; ++i) {
        constraints.add(_map(lines, (val, idx) => (idx == i) ? -val : val));
      }
      //●
      if (val === '●') {
        ++mashu_count;
        // 外側に突き抜けられない都合上、最初に外側の余白が2マスあるかチェック
        let verticals = [];
        let vertical_extensions = [];
        let horizontals = [];
        let horizontal_extensions = [];
        //上
        if (y > 1) {
          verticals.push(get_variable_num(x, y - 1, true));
          vertical_extensions.push(get_variable_num(x, y - 2, true));
        }
        //下
        if (y < height - 2) {
          verticals.push(get_variable_num(x, y, true));
          vertical_extensions.push(get_variable_num(x, y + 1, true));
        }
        //左
        if (x > 1) {
          horizontals.push(get_variable_num(x - 1, y, false));
          horizontal_extensions.push(get_variable_num(x - 2, y, false));
        }
        //右
        if (x < width - 2) {
          horizontals.push(get_variable_num(x, y, false));
          horizontal_extensions.push(get_variable_num(x + 1, y, false));
        }
        // 上下どちらか && 左右どちらか
        constraints.add(verticals);
        constraints.add(horizontals);
        // さらにもう1マス直進
        for (i = 0; i < verticals.length; ++i) {
          constraints.add([-verticals[i], vertical_extensions[i]]);
        }
        for (i = 0; i < horizontals.length; ++i) {
          constraints.add([-horizontals[i], horizontal_extensions[i]]);
        }
      }
      else if (val === '○') {
        ++mashu_count;
        //縦4つ、横4つをまとめて考える（1と2の間に中心マスがある）
        let vertical_line = [];
        let horizontal_line = [];
        let tmp_x = -1, tmp_y = -1;
        for (i = 0; i <= 3; ++i) {
          tmp_x = x - 2 + i;
          tmp_y = y - 2 + i;
          if (tmp_x >= 0 && tmp_x < width - 1) {
            horizontal_line[i] = get_variable_num(tmp_x, y, false);
          }
          if (tmp_y >= 0 && tmp_y < height - 1) {
            vertical_line[i] = get_variable_num(x, tmp_y, true);
          }
        }
        let vertical_available = vertical_line[1] && vertical_line[2];
        let horizontal_available = horizontal_line[1] && horizontal_line[2];
        if (!(vertical_available || horizontal_available)) {
          alert('角に白丸があって、線を引けません。');
          throw new RangeError;
        }
        if (!vertical_available) {
          // 横だと確定の場合
          constraints.add(horizontal_line[1]);
          constraints.add(horizontal_line[2]);
        } else if (!horizontal_available) {
          // 縦だと確定の場合
          constraints.add(vertical_line[1]);
          constraints.add(vertical_line[2]);
        } else {
          // 両方の可能性が残る場合、「線は入るけど曲がらない」条件が必要
          // 他で「2本 or 0本」の条件がかかっているので、必要な条件は意外と少ない
          // （1箇所入っていないけど、2本条件から確定する）
          constraints.add([vertical_line[1], horizontal_line[1]]);
          constraints.add([-vertical_line[1], vertical_line[2]]);
          constraints.add([-horizontal_line[1], -vertical_line[2]]);
        }
        // 先のマスの条件（なければ来ない or 曲がるということなので、無視していい）
        if (vertical_line[0] && vertical_line[3]) {
          constraints.add(_map(vertical_line, x => -x));
        }
        if (horizontal_line[0] && horizontal_line[3]) {
          constraints.add(_map(horizontal_line, x=> -x));
        }
      }
    });
    stopwatch.lap('立式');
    if (mashu_count === 0) {
      alert('フィールドが空です。終了します。');
      return;
    }
     
    // 表示のみ
    // 非同期だけど、変数束縛のためにフロントエンドを用意
    function disp_async(trues) {
      set_immediate(function () {
        var table = [];
        var num;
        var x, y, is_vertical;
        const LEFT = 8, RIGHT = 4, UP = 2, DOWN = 1;
        const parts = { 3: '│', 5: '┌', 6: '└', 9: '┐', 10: '┘', 12: '─' };
        for (y = 0; y < height; ++y) {
          table.push(_fill(new Array(width), 0));
        }
        for (num in trues) {
          ({ x, y, is_vertical } = pos_from_variable_num(num));
          if (is_vertical) {
            table[y][x] += DOWN;
            table[y + 1][x] += UP;
          } else {
            table[y][x] += RIGHT;
            table[y][x + 1] += LEFT;
          }
        }
        field.eachCell(function (val, x2, y2) {
          if (val === '○' || val === '●') return;
          field.setValue(x2, y2, parts[table[y2][x2]] || '');
        });
      });
    }
    
    // 返り値はconstraintsに追加したかどうか
    function check_loop(trues_hash, constraints){
      var checked = {};
      var loops=[];
      var loops_with_mashu = 0;
      var constraint_added = false;
      function one_loop(start_num){
        var current_loop=[];
        var {x, y, is_vertical} = pos_from_variable_num(start_num);
        var current = start_num;
        var new_x, new_y;
        var with_mashu = false;
        var val, arr, i;
        for(;;){
          if(checked[current]) break;
          checked[current] = true;
          current_loop.push(current);
          // ましゅありのループが2つ以上すでにあるなら、もうすべてのループを潰せる
          if(!with_mashu && loops_with_mashu < 2){
            val = field.getValue(x, y);
            if (val === '●' || val === '○'){
              with_mashu = true;
              ++loops_with_mashu;
            }
          }
          // 次のマスへ
          ({x: new_x, y: new_y, is_vertical} = pos_from_variable_num(current));
          if(x !== new_x || y !== new_y) {
            x = new_x;
            y = new_y;
          } else if(is_vertical) {
            x = new_x;
            y = new_y + 1;
          } else{
            x = new_x + 1;
            y = new_y;
          }
          // 次の線を検索
          arr = get_cell_lines(x, y);
          for(i = 0; i < arr.length; ++i) {
            val = arr[i];
            if (val == current)continue;
            if (!trues_hash[val])continue;
            break;
          }
          current = +val;
        }
        //終了処理
        // ましゅなし or ましゅありループがすでに2つ以上の時はすぐに処理
        if(!with_mashu || loops_with_mashu >= 2){
          constraint_added = true;
          constraints.add(_map(current_loop, v => -v));
        } else{
          loops.push(current_loop);
        }
      }
      for(var num in trues_hash){
        if(checked[num])continue;
        one_loop(num);
      }
      // 終了処理（ましゅありループが2つ以上残っていた場合、すべて潰しておく）
      if(loops_with_mashu >= 2){
        constraint_added = true;
        for(var i=0;i<loops.length;++i){
          constraints.add(_map(loops[i],x => -x));
        }
      }
      return constraint_added;
    }
    
    var cleared_trues = null;
    solver.solve_loop(constraints, function (ret_constraints, result_status, result_arr) {
      stopwatch.lap('ソルバー');
      var trues_hash = {};
      var line_count = 0;
      var not_found = result_status !== 'SAT';
      var i;
      if (result_arr) {
        for (i = 0; i < result_arr.length; ++i) {
          if (result_arr[i] > 0) {
            line_count++;
            trues_hash[result_arr[i]] = true;
          }
        }
      }
      disp_async(trues_hash);
      // ループチェックは両者で必要
      let loop_found = check_loop(trues_hash,ret_constraints);
      stopwatch.lap('ループチェック');
      if (!cleared_trues) {
        if (not_found) {
          stopwatch.finish();
          alert('解が見つかりませんでした。');
          return false;
        }
        if (loop_found) {
          return ret_constraints;
        } else{
          if ($('#bypass_unique').is(':checked')){
            stopwatch.finish();
            return false;
          }
          // 別解チェックへ
          cleared_trues = trues_hash;
          ret_constraints.add(_map(Object.keys(trues_hash),x => -x));
          return ret_constraints;
        }
      } else {
        if(not_found){
          stopwatch.finish();
          alert('一意解です。');
          disp_async(cleared_trues);
          return false;
        }
        if(loop_found) {
          return ret_constraints;
        } else{
          stopwatch.finish();
          alert('別解が見つかりました。');
          return false;
        }
      }
    });
    console.log(constraints);
  });
});
