<script setup>
 import {ref,reactive,onMounted} from 'vue'
 import { useRoute } from "vue-router";
 const route =useRoute()
let num = ref()
let result2 = ref()

let circle = ref()
let start
let direction = true
const distance = 1000,period=10000
const animation = (timestamp)=>{
  if(!start) start=timestamp
  let dis = Math.min((timestamp-start)/period*distance,distance)
  let realDis = direction?dis:distance-dis
  circle.value.style.transform = `translateX(${realDis}px)`
  if(timestamp-start>period){
    start = timestamp
    direction = !direction
  }
  requestAnimationFrame(animation)
}
// onMounted(()=>requestAnimationFrame(animation))
</script>

<template>
<div>LazyLoadImg multiple methods</div>
<el-divider/>
<div>calculate result:{{result2}}</div>
<div>requestAnimationFrame</div>
<div class="circle" ref="circle"></div>
</template>

<style lang='scss' scoped>
.circle{
  background-color: aqua;
  width:100px;
  height:100px;
  border-radius: 50px;
}
</style>