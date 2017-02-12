<sudoku-field>
    <table>
        <tr each={row, row_num in data} class={top: row_num % 3 === 0, bottom: (row_num + 1) % 3 === 0}>
            <td each={item, col_num in row}
                class={left: col_num % 3 === 0, right: (col_num + 1) % 3 === 0}
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
    </style>

    <script>
        this.dimension = 3;
        const width = this.dimension * this.dimension;
        this.numbers = Array.from({length: width}, (_, k) => k + 1);
        const make_matrix = require('../lib/make_matrix');
        this.data = opts.data || make_matrix(width, width, '');
        this.selected = '';
        this.clicked = (e) => {
            const row = e.target.dataset.row, col = e.target.dataset.col;
            if(this.selected){
                this.data[row][col] = this.selected;
            }
        };
        this.selectPalette = (e) => {
            if(e.item.number == this.selected){
                this.selected = '';
            }else{
                this.selected = e.item.number;
            }
        };
        this.clear = (e) => {
            const row = e.target.dataset.row, col = e.target.dataset.col;
            this.data[row][col] = '';
            e.preventDefault();
        };
    </script>
</sudoku-field>
