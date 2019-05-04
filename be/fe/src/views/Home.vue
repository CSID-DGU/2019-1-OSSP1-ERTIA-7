<template>
  <v-layout align-center justify-center fill-height>
    <div>
      <v-btn color="teal" style="color:white" large :to="main">login</v-btn>
    </div>
    <div>
      <v-btn color="teal" style="color:white" large :to="user">user</v-btn>
    </div>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        main:"/Main",
        user:"/user"
        
      }
    }
  }
</script>
<style>
</style>
