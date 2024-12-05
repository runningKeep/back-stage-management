<script setup>
import { onBeforeRouteLeave } from "vue-router";
import HelloWorld from '../components/HelloWorld.vue'
import card from '../components/card.vue'
import { effectScope, ref } from "vue";
import useMouse from "@/hooks/useMouse";
onBeforeRouteLeave(()=>{
  console.log('live,home');
})
let show = ref(false)
const scope = effectScope()
scope.run(()=>{
  const {x,y} = useMouse
})
const {x,y,count} = useMouse
</script>

<template>
   <el-button @click="show = !show">toggle show</el-button>
   <!-- <HelloWorld /> -->
   <!-- <div class="view_port">
      <div class="polling_message">Listening for dispatches</div>
      <div class="cylon_eye"></div>
    </div> -->
    <div>{{ `${x},${y}` }}</div>
    <div>{{ count }}</div>
    <div class="box3">
      <!-- <div class="box2"><div class="box">
</div></div> -->
    </div>
    
  <main>
    <keep-alive>
      <card v-if="show" />
    </keep-alive>
  </main>
</template>
<style lang="scss">
.polling_message {
  color: white;
  float: left;
  margin-right: 2%;
}
.box3{
  width: 1000px;
height: 48px;
// background: #FEFAF5;
  background: linear-gradient(to right, #FEFAF5 , #FFF 50%);
  // background: linear-gradient(to right, #FEFAF5 10%, #FEFAF5 0);

box-shadow: 0px 0px 4px 0px rgba(220,223,230,0.5);
border-radius: 8px;
border: 4px solid #FFFFFF;
opacity: 0.8;
}
.box2{
  width: 1376px;
height: 48px;
background: rgba(255,255,255,0.4);
border-radius: 8px;
opacity: 0.8;
backdrop-filter: blur(28px);
}
.view_port {
  background-color: black;
  height: 25px;
  width: 100%;
  overflow: hidden;
}

.cylon_eye {
  background-color: red;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 25%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.9) 75%
  );
  color: white;
  height: 100%;
  width: 20%;

  -webkit-animation: 4s linear 0s infinite alternate move_eye;
  animation: .5s linear 0s infinite alternate move_eye;
}

@-webkit-keyframes move_eye {
  from {
    margin-left: -20%;
  }
  to {
    margin-left: 100%;
  }
}
@keyframes move_eye {
  from {
    // margin-left: -20%;
    transform: scale(.5);
  }
  // 50%{
  //   margin-left:20%
  // }
  to {
    // margin-left: 100%;
    transform: scale(2);
  }
}

</style>
