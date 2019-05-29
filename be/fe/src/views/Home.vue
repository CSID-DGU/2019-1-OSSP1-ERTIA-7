<template>
  <v-layout  row wrap>
  <v-container>
  <v-flex sm12 xs12>
    <div>
      <v-btn color="teal" style="color:white" large :to="main">admin</v-btn>
    </div>
  </v-flex>
  </v-container>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        main:"/Main"

      }
    }
  }
</script>
<style>
</style>
