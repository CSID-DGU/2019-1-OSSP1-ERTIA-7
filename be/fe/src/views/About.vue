<template>

  <!--Gamp 보여주기-->
  <GmapMap
  :center="{lat:10, lng:10}"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
>

<!--Gmap 마커찍기-->
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />

</GmapMap>

</template>

<script>

//넘겨주기 위한 axios import
import axios from 'axios'

export default {

}

</script>
