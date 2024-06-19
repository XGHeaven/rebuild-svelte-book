<script>
  let className = 'a'
  let value = 'b'
  let dataId = 'id'
  let other = 'other'

  setTimeout(() => {
    className = 'a b'
  }, 1000)
</script>

<input class={className} {value} data-id={dataId} others={other} />
