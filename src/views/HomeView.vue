<script setup>
import { onBeforeRouteLeave } from "vue-router";
import HelloWorld from '../components/HelloWorld.vue'
import card from '../components/card.vue'
import { effectScope, ref,reactive } from "vue";
import useMouse from "@/hooks/useMouse";
import useCount from '@/hooks/useCount'
onBeforeRouteLeave(()=>{
  console.log('live,home');
})
let show = ref(false)
const scope = effectScope()
scope.run(()=>{
  const {x,y} = useMouse
})
const {x,y,count} = useMouse
const aa = {a:1,b:2}
    // for(let i of aa){
    //     console.log(i,'ii')
    // }
    for(let i in aa){
        console.log(i,'in')
    }

class route{
  constructor(routes){
    this.routes = routes
  }

  init(){
    window.addEventListener('popstate',(path)=>{
      this.loadRoute(path)
    })
  }
  nav(){
    window.history.pushState()
    this.loadRoute(path)
  }
  loadRoute(){

  }
}
const obj = reactive({person:{name:'xiaoming'},age:18})
const {person,age} = obj
// const counter = useCount(999,2000)
</script>

<template>
   <el-button @click="show = !show">toggle show</el-button>
   <el-button @click="person.name+='-'">changeName</el-button>
   <div class="btn-wrapper">
    <el-button @click.prevent.self="age++">changeName</el-button>
   </div>
    <!-- <div>{{ `${x},${y}` }}</div> -->
    <div>{{ count }}</div>
    <div class="box3">
    </div>
    
  <main>
  <div>{{ person.name }}</div>
  <div>{{ obj.person.name }}</div>
  <div>{{ age }}</div>
  <div>{{ obj.age }}</div>
  <!-- <div>{{ counter }}</div> -->
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
.btn-wrapper{
  width: 100px;
  height: 100px;
  background-color: aqua;
}
</style>
