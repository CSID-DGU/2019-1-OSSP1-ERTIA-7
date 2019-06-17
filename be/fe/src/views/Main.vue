<!--admin main page-->

<template>

  <v-layout
  row
  wrap
  >

    <!--완료됐다고 하는 알람-->
    <v-snackbar
          v-model="snackbar"
          absolute
          top
          right
          color="success"
        >

        <!--알람내용-->
        <span>

          성공적으로 추가되었습니다!

        </span>

        <!--알람에 들어가는 icon-->
      <v-icon
      dark
      >

      check_circle

    </v-icon>

  </v-snackbar>

<!-- 쓰레기통 추가 dialog -->
   <v-dialog
   v-model="addDL"
   persistent max-width="600px"
   >

     <!--초기상태 설정-->
     <template
     v-slot:activator="{ on }"
     >

       <v-flex
       xs12
       sm12
       >

         <!-- 쓰레기통 추가 버튼-->
         <v-btn
         color="teal"
         style="font-weight: bold"
         dark
         v-on="on"
         >

         쓰레기통 추가

       </v-btn>

       </v-flex>

     </template>

     <!--dialog안 작성 form 부분-->
     <v-form ref="form">

       <!--card에 form 구성-->
       <v-card>

         <!--card 제목-->
         <v-card-title>

         <span
         class="headline"
         >

         쓰레기통 정보

       </span>

       </v-card-title>

       <!--form 구성을 위한 내용-->
       <v-card-text>

         <v-container
         grid-list-md
         >

           <v-layout wrap>

             <v-flex xs12 sm12>

               <!--쓰레기통 이름 textfield-->
               <v-text-field
               v-model="newBT.title"
               label="쓰레기통 이름"
               required
               >

               </v-text-field>

             </v-flex>

             <v-flex
             xs12
             sm12
             >

               <!--쓰레기통 위치 선택-->
               <v-select
                v-model="newBT.district"
                 :items="['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']"
                 label="쓰레기통 위치"
                 required
               >

             </v-select>

             </v-flex>

             <v-flex
             xs6
             sm6
             >

               <!--쓰레기통 위도 textfield-->
               <v-text-field
               v-model="newBT.lat"
               ref = "trashLat"
               label="좌표 위도"
               required
               >

             </v-text-field>

             </v-flex>

             <v-flex
             xs6
             sm6
             >

             <!--쓰레기통 경도 textfield-->
               <v-text-field
               v-model="newBT.long"
               ref = "trashLng"
               label="좌표 경도"
               required
               >

             </v-text-field>

             </v-flex>

            <!--Gmap보여주기-->
            <GmapMap
                v-bind:center="{lat:37.555, lng:127}"
                v-bind:zoom="11.5"
                map-type-id="terrain"
                style="width: 500px; height: 200px"
                >

                <!--Gmap 마커찍기-->
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

         <v-spacer>

         </v-spacer>

         <!--저장버튼-->
         <v-btn
         style="font-weight: bold"
         color="blue darken-1"
         flat
         @click="addSubmit"
         >

         저장

       </v-btn>

       <!--취소버튼-->
         <v-btn
         style="font-weight: bold"
         flat
         @click="addDL = false"
         >

         취소

       </v-btn>

       </v-card-actions>

     </v-card>

     </v-form>

   </v-dialog>

<!-- 각각 쓰레기통 카드들 -->
    <v-flex xs2 sm2
    v-for="(trashbin,index) in trashbins"
    :key="index"
    class="ml-2 mt-2 mb-2"
    >

    <!--card형식-->
      <v-card>

        <!--card 제목-->
        <v-card-title
        primary-title
        >

            <!--쓰레기통 이름-->
            <h3
            class="headline"
            >

            {{trashbin.title}}

          </h3>

          <v-layout
          justify-end
          >

          <!--쓰레기통 차있는 양-->
          <span
           class="tbamount"
           >

           {{trashbin.amount}}%

         </span>

       </v-layout>

        </v-card-title>

        <div>

          <!--쓰레기통 위치-->
          <h4
          class="ml-3 mb-0"
          >

          위치: {{trashbin.district}}

        </h4>

        </div>

        <v-card-actions>

          <!--쓰레기통 수정 dialog-->
          <v-dialog
          v-model="trashbin.editDL"
          persistent
          max-width="600px"
          >

<!-- 쓰레기통 수정 버튼 dialog-->
            <template
            v-slot:activator="{ on }"
            >

              <v-flex
              xs12
              sm12
              >

              <!--쓰레기통 수정 dialog-->
              <v-btn
              flat
              color="blue"
              style="font-weight: bold"
              dark
              v-on="on"
              >

              쓰레기통 수정

            </v-btn>

              </v-flex>

            </template>

            <v-form>

              <!--card 형식-->
              <v-card>

                <!--card 제목-->
                <v-card-title>

                  <span
                  class="headline"
                  >

                쓰레기통 정보

                  </span>

                </v-card-title>

              <!--form 구성을 위한 내용-->
              <v-card-text>

                <v-container
                grid-list-md
                >

                  <v-layout
                  wrap
                  >

                    <v-flex
                    xs12
                    sm12
                    >

                    <!--쓰레기통 이름-->
                      <v-text-field
                      v-model="editBT.title"
                      label="쓰레기통 이름"
                      required
                      >

                    </v-text-field>

                    </v-flex>

                    <v-flex
                    xs12
                    sm12
                    >

                    <!--쓰레기통 위치-->
                      <v-select
                      v-model="editBT.district"
                        :items="['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']"
                        label="쓰레기통 위치"
                        required
                      >

                    </v-select>

                    </v-flex>

                    <v-flex
                    xs6
                    sm6
                    >

                    <!--쓰레기통 위도-->
                      <v-text-field
                      v-model="editBT.lat"
                      label="좌표 위도"
                      required
                      >

                    </v-text-field>

                    </v-flex>

                    <v-flex
                    xs6
                    sm6
                    >

                    <!--쓰레기통 경도-->
                      <v-text-field
                      v-model="editBT.long"
                      label="좌표 경도"
                      required
                      >

                    </v-text-field>

                    </v-flex>

                    <!--Gmap 보여주기-->
                    <GmapMap
                      v-bind:center="{lat:37.555, lng:127}"
                      v-bind:zoom="11.5"
                      map-type-id="terrain"
                      style="width: 500px; height: 200px"
                    >

                    <!--Gmap 마커찍기-->
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

                <v-spacer>

                </v-spacer>

                <!--변경사항 저장버튼-->
                <v-btn
                style="font-weight: bold"
                color="blue darken-1"
                flat
                @click="editSubmit(trashbins[index], index)"
                >

                저장

              </v-btn>

              <!--변경 취소-->
                <v-btn
                style="font-weight: bold"
                flat
                @click="trashbin.editDL = false"
                >

                취소

              </v-btn>

              </v-card-actions>

            </v-card>

            </v-form>

          </v-dialog>

<!-- 쓰레기통 삭제 -->
          <v-dialog
          v-model="trashbin.delDL"
          persistent
          max-width="600px"
          >

          <!--초기상태 설정-->
              <template
              v-slot:activator="{ on }"
              >

                <v-flex
                xs12
                sm12
                >

                <!--쓰레기통 삭제 버튼-->
                <v-btn
                flat
                color="red"
                style="font-weight: bold"
                dark
                v-on="on"
                >

                쓰레기통 삭제

              </v-btn>

                </v-flex>

              </template>

              <v-card>

                <v-card-title>

                  <!--삭제 재확인-->
                  <span
                  class="headline"
                  >

                  정말 삭제하시겠습니까?

                </span>

                </v-card-title>

                <v-card-actions>

                  <v-spacer>

                  </v-spacer>

                  <!--삭제버튼-->
                    <v-btn
                    color="red"
                    style="font-weight: bold"
                    flat
                    @click="deleteSubmit(trashbins[index], index)"
                    >

                    삭제

                  </v-btn>

                  <v-btn
                  style="font-weight: bold"
                  flat
                  @click="trashbin.delDL = false"
                  >

                  취소

                </v-btn>

                </v-card-actions>

              </v-card>

            </v-dialog>

        </v-card-actions>

      </v-card>

    </v-flex>

  </v-layout>

</template>

<script>

    // backend로 넘겨주기 위한 axios import
  import axios from 'axios'

  //database인 firebase 사용을 위한 firebase import
  import firebase from 'firebase'

  //firebase config
  let config = {

  }

  let fapp = firebase.initializeApp(config);
  let db = fapp.database();
  let tbsRef=db.ref('trashBins');

  export default {
    data () {
      return {
        //새로운 쓰레기통을 위한 변수
        newBT: {
          title:'', // 쓰레기통 이름
          district:'',  //쓰레기통 위치
          lat:'', //쓰레기통 경도
          long:'',  //쓰레기통 위도
          amount:'0', //쓰레기통 초기 양
          editDL:false, //쓰레기통 정보수정을 위한 변수
          delDL:false //쓰레기통 삭제를 위한 변수
        },
        //쓰레기통 수정을 위한 변수
        editBT: {
          title:'', //쓰레기통 이름
          district:'',  //쓰레기통 위치
          lat:'', //쓰레기통 경도
          long:'' //쓰레기통 위도
        },
        //Gmap을 위한 변수
        center : {lat:37.555, lng:127},
        markers: [{
          position:{lat:37.555, lng:127}
        }],
        //trashbins: [],
        //쓰레기통 제어를 위한 변수들
        addDL: false,
        editDL : false,
        delDL : false,
        //알람 제어를 위한 변수
        snackbar:false
        }
    },

    //시작시 쓰레기통 정보 가져오기
    mounted () {
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
      //쓰레기통 추가
      addSubmit () {
        tbsRef.push(this.newBT)
        console.log(this.newBT)
        this.addDL=false
        this.snackbar=true
      },

      //쓰레기통 수정
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

      // 쓰레기통 삭제
      deleteSubmit (tb, key) {
        this.trashbins[key].delDL=false
        tbsRef.child(tb['.key']).remove()
        console.log(key)
        console.log(tb)
        //this.trashbins[key].delDL=false
      },

      //Gmap 마커 위치 가져오기
      getMarkerPosition(place) {
        this.newBT.lat= place.latLng.lat()
        this.newBT.long= place.latLng.lng()
        console.log('lat: ' + place.latLng.lat())
        console.log('lng: ' + place.latLng.lng())
      },

      //위치 수정시 Gmap 마커 위치 가져오기
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
.tbamount{
  font-size: 20px;
}
</style>
