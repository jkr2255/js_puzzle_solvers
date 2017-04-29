<akari-field>
  <div class=control>
    <label>幅: <input type="number" ref="width" value={width} min='2' onchange={onInputSize} oninput={onInputSize} /></label>
    ×
    <label>高さ: <input type="number" ref="height" value={height} min='2' onchange={onInputSize} oninput={onInputSize} /></label>
    <input type="button" value="変更 &amp; クリア" onclick={recreateField} />
  </div>
  <div class="control">
    操作モード：
    <label><input type="radio" name=creating value=1 checked={creating} onchange={onCreatingChange}> 作問</label>
    <label><input type="radio" name=creating value=0 checked={!creating} onchange={onCreatingChange}> 解答</label>
  </div>
  <table>
    <tr each={row, row_num in data}>
      <td each={item, col_num in row} class={num: 0 < item, lit: lit[row_num][col_num]}
      data-row={row_num} data-col={col_num}
      oncontextmenu={clearCell}
      onclick={onClickCell}>{disp(item)}</td>
    </tr>
  </table>

  <style>
    div.control{
      margin: 5px 0;
    }
    table{
      border-collapse: collapse;
      border: 2px solid #000;
    }
    td{
      width: 1.5em;
      height: 1.5em;
      border: 1px solid #000;
      vertical-align: middle;
      text-align: center;
    }
    td.num{
      background-color: #000;
      color: #fff;
    }
    td.lit{
      background-color: #ffc;
    }
  </style>

  <script>
    var tag = this
    tag.width = tag.height = 10
    tag.creating = true
    const make_matrix = require('../lib/make_matrix')
    tag.recreateField = () => {
      tag.data = make_matrix(tag.width, tag.height, '')

    }
    tag.recreateField()
    tag.onInputSize = () => {
      tag.width = tag.refs.width.value
      tag.height = tag.refs.height.value
    }
    tag.onCreatingChange = (e) => {
      tag.creating = e.target.value == '1'
    }
    tag.disp = num => {
      if(num == '') return ''
      if(num == 5) return '0'
      if(num == 6) return ''
      if(num == -1) return '○'
      return num
    }
    tag.on('update', () => {
      // 照らされるマスの計算
      tag.lit = make_matrix(tag.width, tag.height, false)
      for(let row = 0; row < tag.height; ++row){
        let min = null, lit = false
        for(let col = 0; col < tag.width; ++col) {
          const val = +tag.data[row][col]
          // 右
          if(val > 0) {
            lit = false
            min = null
            continue
          }
          if(min === null) min = col
          if(val === -1) {
            lit = true
            // 左
            if(min !== null) {
              for(let c = min; c < col; ++c) {
                tag.lit[row][c] = true
              }
            }
            // 上
            for(let r = row - 1; r >= 0; --r) {
              if(tag.data[r][col] > 0) break
              tag.lit[r][col] = true
            }
            // 下
            for(let r = row + 1; r <tag.height; ++r) {
              if(tag.data[r][col] > 0) break
              tag.lit[r][col] = true
            }
          }
          if(lit) tag.lit[row][col] = true
        }
      }
    })
    const nexts = {
      '6': 5,
      '5': 1,
      '1': 2,
      '2': 3,
      '3': 4,
      '4': ''
    }
    tag.onClickCell = e => {
      const row = e.target.dataset.row, col = e.target.dataset.col
      const current = tag.data[row][col]
      if(tag.creating) {
        if(current in nexts) {
          tag.data[row][col] = nexts[current]
        } else {
          tag.data[row][col] = 6
        }
        return
      } else if (tag.data[row][col] > 0) return
      tag.data[row][col] = -1
    }
    tag.clearCell = e => {
      e.preventDefault()
      const row = e.target.dataset.row, col = e.target.dataset.col
      if (!tag.creating && tag.data[row][col] > 0) return
      tag.data[row][col] = ''
    }
  </script>
</akari-field>
