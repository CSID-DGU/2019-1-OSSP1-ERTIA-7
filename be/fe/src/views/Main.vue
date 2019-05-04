<template>
  <v-layout row wrap>
    <v-flex xs12 sm12>
        <v-btn large color="teal" style="color:white">add bin</v-btn>
    </v-flex>

    <v-flex xs2 sm2
    v-for="card in cards"
    :key="card.title"
    class="ml-2">
      <v-card >
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{card.title}}</h3>
          </div>
        </v-card-title>
        <div>
          <h4 class="ml-3 mb-0">위치: {{card.location}}</h4>
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
  export default {
    data () {
      return {
        cards:[
          {title: 'bin1', location: '중랑구'},
          {title: 'bin2', location: '중구'},
          {title: 'bin3', location: '동대문구'}
        ]
        }
    }
  }
</script>

<style>
</style>
