<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
        <v-btn large color="teal" style="color:white">add bin</v-btn>
    </v-flex>

    <v-flex xs2 sm2
    v-for="trashbin in trashbins"
    :key="trashbin.title"
    class="ml-2">
      <v-card >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{trashbin.title}}</h3>
          </div>
        </v-card-title>
        <div>
          <h4 class="ml-3 mb-0">위치: {{trashbin.location}}</h4>
        </div>

        <v-card-actions>
          <v-btn flat color="blue">edit bin</v-btn>
          <v-btn flat color="red">delete bin</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        trashbins: []
        }
    },
    mounted () {
      axios.get('http://localhost:3000/api/trashbin')
        .then((r) => {
          this.trashbins = r.data.trashbins
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
</script>

<style>
</style>
