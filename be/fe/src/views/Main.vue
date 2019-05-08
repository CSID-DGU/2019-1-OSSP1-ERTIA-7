<template>
  <v-layout row wrap>


<!-- 쓰레기통 추가 dialog -->
   <v-dialog v-model="addDL" persistent max-width="600px">
     <template v-slot:activator="{ on }">
       <v-flex xs12 sm12>
       <v-btn color="teal" style="font-weight: bold" dark  v-on="on">쓰레기통 추가</v-btn>
       </v-flex>
     </template>
     <v-card>
       <v-card-title>
         <span class="headline">쓰레기통 정보</span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 sm12>
               <v-text-field label="쓰레기통 이름" required></v-text-field>
             </v-flex>
             <v-flex xs12 sm12>
               <v-select
                 :items="['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']"
                 label="쓰레기통 위치"
                 required
               ></v-select>
             </v-flex>
             <v-flex xs6 sm6>
               <v-text-field label="좌표 위도" required></v-text-field>
             </v-flex>
             <v-flex xs6 sm6>
               <v-text-field label="좌표 경도" required></v-text-field>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn style="font-weight: bold" color="blue darken-1" flat @click="addDL = false">저장</v-btn>
         <v-btn style="font-weight: bold" flat @click="addDL = false">취소</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>


<!-- 각각 쓰레기통 카드들 -->
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
          <v-dialog v-model="editDL" persistent max-width="600px">


<!-- 쓰레기통 수정 버튼 dialog-->
            <template v-slot:activator="{ on }">
              <v-flex xs12 sm12>
              <v-btn flat color="blue" style="font-weight: bold" dark v-on="on">쓰레기통 수정</v-btn>
              </v-flex>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">쓰레기통 정보</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12>
                      <v-text-field label="쓰레기통 이름" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-select
                        :items="['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']"
                        label="쓰레기통 위치"
                        required
                      ></v-select>
                    </v-flex>
                    <v-flex xs6 sm6>
                      <v-text-field label="좌표 위도" required></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6>
                      <v-text-field label="좌표 경도" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn style="font-weight: bold" color="blue darken-1" flat @click="editDL = false">저장</v-btn>
                <v-btn style="font-weight: bold" flat @click="editDL = false">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

<!-- 쓰레기통 삭제 -->
            <v-dialog v-model="delDL" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-flex xs12 sm12>
                <v-btn flat color="red" style="font-weight: bold" dark v-on="on">쓰레기통 삭제</v-btn>
                </v-flex>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">정말 삭제하시겠습니까?</span>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn color="red" style="font-weight: bold" flat @click="delDL = false">삭제</v-btn>
                  <v-btn style="font-weight: bold"flat @click="delDL = false">취소</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
        trashbins: [],
        addDL: false,
        editDL : false,
        delDL : false
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
