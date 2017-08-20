<indicator>
  <div class=indicator>
    <p each={mes in messages}>{mes}</p>
  </div>

  <style>
    .indicator {
      height:4.5em;
      line-height:1.5;
      overflow-y:auto;
      border:1px solid #ccc;
      margin:20px;
    }

    .indicator p {
      margin:0 0.5em;
    }
  </style>

  <script>
    const tag = this
    const messages = tag.messages = []
    tag.log = (mes) => {
      messages.push(mes)
      tag.update()
    }
    tag.clear = () => {
      messages.length = 0
      tag.update()
    }
  </script>
</indicator>
