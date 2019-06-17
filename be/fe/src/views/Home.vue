<!--처음 페이지-->

<template>

  <v-layout
  align-center
  justify-center
  fill-height
  >
    
    <div>
      <!--admin page 진입버튼-->
      <v-btn
      color="teal"
      style="color:white"
      large
      :to="main"
      >
      login
    </v-btn>

    </div>

  </v-layout>

</template>

<script>

  export default {
    data () {
      return {
        //main page url
        main:"/Main"
      }
    }
  }
</script>
<style>
</style>
