<script setup>
 import {ref,reactive,onMounted} from 'vue'
 onMounted(()=>{
  let dom = document.querySelector('.aa')
  let dom2= document.querySelector('.wrapper2')
  // dom.addEventListener()
  dom2.addEventListener('scroll',()=>{
    console.log('cc')
    console.log(dom.offsetTop)
    console.log(dom.scrollTop,'sc')
  })
 })
</script>

<template>
 <div>Iframe</div> 
 <div class="wrapper2">
  <div class="box">
  <span class="aa">aa</span>
 </div>
 </div>
 
</template>

<style lang='scss' scoped>
.box{
  height:1000px
}
.wrapper2{
  position: relative;
  overflow: auto;
  height:400px
}
</style>