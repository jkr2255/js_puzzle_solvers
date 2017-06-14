<sudoku-field>
    <div class="control">
        操作モード：
        <label><input type="radio" name=creating value=1 checked={creating} onchange={onCreatingChange} ref=creatingRadio> 作問</label>
        <label><input type="radio" name=creating value=0 checked={!creating} onchange={onCreatingChange}> 解答</label>
        <button type=button onclick={allClear}>全クリア</button>
        <button type=button onclick={clearAnswer}>解答をクリア</button>
    </div>
    <table>
        <tr each={row, row_num in data} class={top: row_num % dimension === 0, bottom: (row_num + 1) % dimension === 0}>
            <td each={item, col_num in row}
                class={left: col_num % dimension === 0, right: (col_num + 1) % dimension === 0, question: isQuestion[row_num][col_num]}
                data-row={row_num} data-col={col_num}
                onclick={clicked} oncontextmenu={clear}
            >{item}</td>
        </tr>
    </table>
    <h3>パレット</h3>
    <table>
        <tr>
            <td each={number in numbers} data-number={number} onclick={selectPalette} class={selected: selected == number}>
                {number}
            </td>
        </tr>
    </table>

    <style>
        div.control{
            margin: 5px 0;
        }
        table{
            border-collapse: collapse;
        }
        td{
            width: 1.5em;
            height: 1.5em;
            border: 1px solid #000;
            vertical-align: middle;
            text-align: center;
        }
        tr.top td{
            border-top-width: 2px;
        }
        tr.bottom td{
            border-bottom-width: 2px;
        }
        td.left{
            border-left-width: 2px;
        }
        td.right{
            border-right-width: 2px;
        }
        td.selected{
            background-color: #ffb;
        }
        td.question{
            font-weight: bold;
            color: #008;
        }
    </style>

    <script>
        const tag = this;
        tag.dimension = 3;
        tag.creating = true;
        const width = tag.dimension * tag.dimension;
        var numbers = tag.numbers = [];
        for(let i = 1; i <= width; ++i) numbers.push(i);
        const make_matrix = require('../lib/make_matrix');
        tag.data = opts.data || make_matrix(width, width, '');
        tag.isQuestion = opts.isQuestion || make_matrix(width, width, false);
        tag.selected = '';
        tag.clicked = (e) => {
            const row = e.target.dataset.row, col = e.target.dataset.col;
            if(!tag.creating && tag.isQuestion[row][col]) return;
            if(tag.selected){
                tag.data[row][col] = tag.selected;
                tag.isQuestion[row][col] = tag.creating;
            }
        };
        tag.selectPalette = (e) => {
            if(e.item.number == tag.selected){
                tag.selected = '';
            }else{
                tag.selected = e.item.number;
            }
        };
        tag.clear = (e) => {
            const row = e.target.dataset.row, col = e.target.dataset.col;
            if(!tag.creating && tag.isQuestion[row][col]) return;
            tag.data[row][col] = '';
            tag.isQuestion[row][col] = false;
            e.preventDefault();
        };
        tag.onCreatingChange = (e) => {
            tag.creating = tag.refs.creatingRadio.checked;
        };
        tag.allClear = () => {
            tag.data = make_matrix(width, width, '');
            tag.isQuestion = make_matrix(width, width, false);
        }
        tag.clearAnswer = () => {
            for(let r = 0; r < width; ++r){
                for(let c = 0; c < width; ++c) {
                    if(!tag.isQuestion[r][c]) tag.data[r][c] = '';
                }
            }
        }
    </script>
</sudoku-field>
