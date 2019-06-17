<template>

  <v-container
  grid-list-md
  text-xs-center
  >

    <v-layout
    row
    wrap
    >

      <v-flex
      xs12
      sm3
      >

      <!--card 형식-->
        <v-card>

          <v-card-title
          primary-title
          >

            <div>

              <!--user 정보 get-->
              <h3
              class="headline mb-0"
              >

              get

            </h3>

            </div>

          </v-card-title>

          <v-card-text>

            <v-textarea
            v-model='getMd'
            >

            </v-textarea>

          </v-card-text>

          <v-card-actions>

            <v-btn
            flat
            color="orange"
            @click="getReq"
            >

            submit

          </v-btn>

          </v-card-actions>

        </v-card>

      </v-flex>

      <v-flex xs12 sm3>

        <v-card>

          <v-card-title
          primary-title
          >

            <div>

              <!--user정보 post-->
              <h3
              class="headline mb-0"
              >

              post

            </h3>

            </div>

          </v-card-title>

          <v-card-text>

            <v-textarea
            v-model='postMd'
            >

            </v-textarea>

          </v-card-text>

          <v-card-actions>

            <!--user정보 post버튼-->
            <v-btn
            flat
            color="orange"
            @click="postReq"
            >

            submit

          </v-btn>

          </v-card-actions>

        </v-card>

      </v-flex>

      <v-flex
      xs12
      sm3
      >
        <v-card>

          <v-card-title
          primary-title
          >

            <div>
              <!--user submit을 위한 put-->
              <h3
              class="headline mb-0"
              >

              put

            </h3>

            </div>

          </v-card-title>

          <v-card-text>

            <v-textarea
            v-model='putMd'
            >
            </v-textarea>

          </v-card-text>

          <v-card-actions>

            <v-btn
            flat
            color="orange"
            @click="putReq"
            >

            submit

          </v-btn>

          </v-card-actions>

        </v-card>

      </v-flex>

      <v-flex
      xs12
      sm3
      >

        <v-card>

          <v-card-title
          primary-title
          >

            <div>

              <!-- user delete를 위한 delete-->
              <h3
              class="headline mb-0"
              >

                del

              </h3>

            </div>

          </v-card-title>

          <v-card-text>

            <v-textarea
            v-model='delMd'
            >

            </v-textarea>

          </v-card-text>

          <v-card-actions>

            <v-btn
            flat color="orange"
            @click="delReq"
            >

            submit

          </v-btn>

          </v-card-actions>

        </v-card>

      </v-flex>

    </v-layout>

  </v-container>

</template>

<script>

// backend로 data를 넘겨주기 위한 axios import
import axios from 'axios'

export default {
  data () {
    return {
      //user 정보
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: ''
    }
  },

  mounted () {
  },

  methods: {
    //get 명령 실행
    getReq () {
      axios.get('http://localhost:3000/api/user', {
        user: 'getMan'
      })
        .then((r) => {
          this.getMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    //post 명령 실행
    postReq () {
      axios.post('http://localhost:3000/api/user', {
        user: 'postMan'
      })
        .then((r) => {
          this.postMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    //put 명령 실행
    putReq () {
      axios.put('http://localhost:3000/api/user', {
        user: 'putMan'
      })
        .then((r) => {
          this.putMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    //del 명령 실행
    delReq () {
      axios.delete('http://localhost:3000/api/user')
        .then((r) => {
          this.delMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
}
</script>
