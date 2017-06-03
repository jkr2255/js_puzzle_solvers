'use strict';

const $ = require('jquery');

module.exports = class PuzzleField{
  constructor(selector) {
    this.width = this.height = 0;
    this.$field = $(selector);
    this.values = [];
    this.$field.on('click.field', 'td', (e) => {
      e.preventDefault();
      if (this.changeDisabled) {
        return;
      }
      if ($.isFunction(this.changeFunc)) {
        const ref = e.target.dataset.pos.split('_'), x = ref[0], y = ref[1];
        const val = this.getValue(x, y);
        const new_val = this.changeFunc(val, true, x, y);
        if (new_val !== false) {
          this.setValue(x, y, new_val);
        }
      }
    });
    this.$field.on('contextmenu.field', 'td', (e) =>{
      e.preventDefault();
      if (this.changeDisabled) {
        return;
      }
      if ($.isFunction(this.changeFunc)) {
        const ref = e.target.dataset.pos.split('_'), x = ref[0], y = ref[1];
        const val = this.getValue(x, y);
        const new_val = this.changeFunc(val, false, x, y);
        if (new_val !== false) {
          this.setValue(x, y, new_val);
        }
      }
    });
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.values = [];
    this.$field.empty();
    for (let y = 0; y < height; ++y) {
      const $tr = $('<tr />');
      this.$field.append($tr);
      this.values.push([]);
      for (let x = 0; x < width; ++x) {
        const $td = $('<td />');
        $td.attr('data-pos', x + "_" + y).appendTo($tr);
        this.values[y].push('');
      }
    }
    return this;
  }

  setValue(x, y, val) {
    this.$field.find("td[data-pos='" + x + "_" + y + "']").text(val);
    this.values[y][x] = val;
    return this;
  }

  getValue(x, y) {
    return this.values[y][x];
  }

  eachCell(func) {
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        if (func(this.values[y][x], x, y) === false) {
          return false;
        }
      }
    }
    return true;
  }
};
