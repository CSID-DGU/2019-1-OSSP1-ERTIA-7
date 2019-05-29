<template>
  <v-app  class="Appsize">
    <v-content class="Appsize">
      <router-view  class="Appsize">
      </router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
<style>
.Appsize{
  width: full;
  height: 600px;
}
</style>
