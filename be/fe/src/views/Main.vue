<template>
  <v-layout row wrap>
<v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>성공적으로 추가되었습니다!</span>
      <v-icon dark>check_circle</v-icon>
  </v-snackbar>
<!-- 쓰레기통 추가 dialog -->
   <v-dialog v-model="addDL" persistent max-width="600px">
     <template v-slot:activator="{ on }">
       <v-flex xs12 sm12>
       <v-btn color="teal" style="font-weight: bold" dark  v-on="on">쓰레기통 추가</v-btn>
       </v-flex>
     </template>
     <v-form ref="form">
     <v-card>
       <v-card-title>
         <span class="headline">쓰레기통 정보</span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 sm12>
               <v-text-field
               v-model="newBT.title"
               label="쓰레기통 이름"
               required></v-text-field>
             </v-flex>
             <v-flex xs12 sm12>
               <v-select
                v-model="newBT.district"
                 :items="['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']"
                 label="쓰레기통 위치"
                 required
               ></v-select>
             </v-flex>
             <v-flex xs6 sm6>
               <v-text-field
               v-model="newBT.lat"
               ref = "trashLat"
               label="좌표 위도"
               required></v-text-field>
             </v-flex>
             <v-flex xs6 sm6>
               <v-text-field
               v-model="newBT.long"
               ref = "trashLng"
               label="좌표 경도"
               required></v-text-field>
             </v-flex>
             <!-- <GmapMap
                :center="{lat:37.555, lng:127}"
                :zoom="11.5"
                map-type-id="terrain"
                style="width: 500px; height: 200px"
                    >
              <GmapMarker


                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
              />
            </GmapMap> -->
            <GmapMap
                v-bind:center="{lat:37.555, lng:127}"
                v-bind:zoom="11.5"
                map-type-id="terrain"
                style="width: 500px; height: 200px"
                    >
              <GmapMarker
                v-bind:key="index"
                v-for="(m, index) in markers"
                v-bind:position="m.position"
                v-bind:clickable="true"
                v-bind:draggable="true"
                @dragend="getMarkerPosition"
              />
            </GmapMap>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn style="font-weight: bold" color="blue darken-1" flat @click="addSubmit">저장</v-btn>
         <v-btn style="font-weight: bold" flat @click="addDL = false">취소</v-btn>
       </v-card-actions>
     </v-card>
     </v-form>
   </v-dialog>


<!-- 각각 쓰레기통 카드들 -->
    <v-flex xs2 sm2
    v-for="(trashbin,index) in trashbins"
    :key="index"
    class="ml-2 mb-2 mt-2">
      <v-card >
        <v-card-title primary-title>
          <span style="margin-right: auto; font-size: 20px" >{{trashbin.title}}</span>
            <span style="font-size: 18px">{{trashbin.amount}}%</span>
        </v-card-title>
        <div>
          <h4 class="ml-3 mb-0">위치: {{trashbin.district}}</h4>
        </div>

        <v-card-actions>
          <v-dialog v-model="trashbin.editDL" persistent max-width="600px">


<!-- 쓰레기통 수정 버튼 dialog-->
            <template v-slot:activator="{ on }">
              <v-flex xs12 sm12>
              <v-btn flat color="blue" style="font-weight: bold" dark v-on="on">쓰레기통 수정</v-btn>
              </v-flex>
            </template>
            <v-form>
            <v-card>
              <v-card-title>
                <span class="headline">쓰레기통 정보</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12>
                      <v-text-field
                      v-model="editBT.title"
                      label="쓰레기통 이름"
                      required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12>
                      <v-select
                      v-model="editBT.district"
                        :items="['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']"
                        label="쓰레기통 위치"
                        required
                      ></v-select>
                    </v-flex>
                    <v-flex xs6 sm6>
                      <v-text-field
                      v-model="editBT.lat"
                      label="좌표 위도"
                      required></v-text-field>
                    </v-flex>
                    <v-flex xs6 sm6>
                      <v-text-field
                      v-model="editBT.long"
                      label="좌표 경도"
                      required></v-text-field>
                    </v-flex>

                    <GmapMap
                      v-bind:center="{lat:37.555, lng:127}"
                      v-bind:zoom="11.5"
                      map-type-id="terrain"
                      style="width: 500px; height: 200px"
                    >
                      <GmapMarker
                        v-bind:key="index"
                        v-for="(m, index) in markers"
                        v-bind:position="m.position"
                        v-bind:clickable="true"
                        v-bind:draggable="true"
                        @dragend="getMarkerPositionEdit"
                      />
                      </GmapMap>

                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn style="font-weight: bold" color="blue darken-1" flat @click="editSubmit(trashbins[index], index)">저장</v-btn>
                <v-btn style="font-weight: bold" flat @click="trashbin.editDL = false">취소</v-btn>
              </v-card-actions>
            </v-card>
            </v-form>
          </v-dialog>

<!-- 쓰레기통 삭제 -->
          <v-dialog v-model="trashbin.delDL" persistent max-width="600px">
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
                    <v-btn color="red" style="font-weight: bold" flat @click="deleteSubmit(trashbins[index], index)">삭제</v-btn>
                  <v-btn style="font-weight: bold" flat @click="trashbin.delDL = false">취소</v-btn>
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
  import firebase from 'firebase'

  let config = {
    apiKey: "AIzaSyC_PXtAD4_mHIZDvBHwlilhY-c_AN3B0qY",
    authDomain: "ertia-1555997688215.firebaseapp.com",
    databaseURL: "https://ertia-1555997688215.firebaseio.com",
    storageBucket: "gs://ertia-1555997688215.appspot.com/",
  }

  let fapp = firebase.initializeApp(config);
  let db = fapp.database();

  let tbsRef=db.ref('trashBins')

  export default {
    data () {
      return {
        newBT: {
          title:'',
          district:'',
          lat:'',
          long:'',
          amount:'0',
          editDL:false,
          delDL:false
        },
        editBT: {
          title:'',
          district:'',
          lat:'',
          long:''
        },
        center : {lat:37.555, lng:127},
        markers: [{
          position:{lat:37.555, lng:127}
        }],
        //trashbins: [],
        addDL: false,
        editDL : false,
        delDL : false,
        snackbar:false
        }
    },
    mounted () {
      // axios.get('http://localhost:3000/api/trashbin')
      //   .then((r) => {
      //     this.trashbins = r.data.trashbins
      //     console.log(r)
      //   })
      //   .catch((e) => {
      //     console.error(e.message)
      //   })
        tbsRef.on('value', function(tbs) {
          tbs.forEach(function (childtbs) {
            var tb=childtbs.val()
            console.log(tb)
          })
        })
    },
    firebase: {
      trashbins: db.ref('trashBins'),
    },
    methods: {
      addSubmit () {
        tbsRef.push(this.newBT)
        console.log(this.newBT)
        this.addDL=false
        this.snackbar=true
      },
      editSubmit (tb, key) {
        //var updates={}
        //updates['/trashBins/'+tb.key+'/'+this.editBT]
        tbsRef.child(tb['.key']).update({
          title: this.editBT.title,
          district: this.editBT.district,
          lat: this.editBT.lat,
          long: this.editBT.long
        })
        //db.ref().update(updates)
        console.log(key)
        this.trashbins[key].editDL=false
      },
      deleteSubmit (tb, key) {
        this.trashbins[key].delDL=false
        tbsRef.child(tb['.key']).remove()
        console.log(key)
        console.log(tb)
        //this.trashbins[key].delDL=false
      },
      getMarkerPosition(place) {
        this.newBT.lat= place.latLng.lat()
        this.newBT.long= place.latLng.lng()
        console.log('lat: ' + place.latLng.lat())
        console.log('lng: ' + place.latLng.lng())
      },
      getMarkerPositionEdit(place) {
        this.editBT.lat= place.latLng.lat()
        this.editBT.long= place.latLng.lng()
        console.log('lat: ' + place.latLng.lat())
        console.log('lng: ' + place.latLng.lng())
      }
    }
  }
</script>

<style>
</style>
