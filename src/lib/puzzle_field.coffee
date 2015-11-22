$ = require 'jquery'

module.exports = class
  width: 0
  height: 0
  changeFunc: null
  changeDisabled: false
  
  constructor: (selector)->
    @$field = $ selector
    @values = []
    @$field.on 'click.field', 'td', (e)=>
      do e.preventDefault
      return if @changeDisabled
      if $.isFunction @changeFunc
        [x,y] = e.target.dataset.pos.split '_'
        val = @getValue(x, y)
        new_val = @changeFunc(val,true,x,y)
        @setValue(x,y,new_val) unless new_val == false
      return
    @$field.on 'contextmenu.field', 'td', (e)=>
      do e.preventDefault
      return if @changeDisabled
      if $.isFunction @changeFunc
        [x,y] = e.target.dataset.pos.split '_'
        val = @getValue(x, y)
        new_val = @changeFunc(val,false,x,y)
        @setValue(x,y,new_val) unless new_val == false
      return
    
  setSize: (width, height)->
    @width = width
    @height = height
    @values = []
    do @$field.empty
    for y in [0...height]
      $tr = $ '<tr />'
      @$field.append $tr
      @values.push []
      for x in [0...width]
        $td =  $ '<td />'
        $td.attr('data-pos', "#{x}_#{y}").appendTo $tr
        @values[y].push ''
    this

  setValue: (x, y, val) ->
    @$field.find("td[data-pos='#{x}_#{y}']").text val
    @values[y][x] = val
    this

  getValue: (x, y) -> @values[y][x]
  
  eachCell: (func) ->
    for y in [0...@height]
      for x in [0...@width]
        return false if func(@values[y][x], x, y) == false
    true
  
    
