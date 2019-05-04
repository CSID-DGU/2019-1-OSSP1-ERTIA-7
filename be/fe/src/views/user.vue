<template>
  <div class="user">
    <h1>This is an user page</h1>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  mounted () {
    axios.get('http://localhost:3000/api/user')
      .then((r) => {
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
  }
}
</script>
