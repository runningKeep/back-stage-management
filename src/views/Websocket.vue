<script setup>
 import {ref,reactive, nextTick, onMounted} from 'vue'

 const bottom = ref()
const socket = new WebSocket('ws://127.0.0.1:8090');

socket.addEventListener("open", function (event) {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  // console.log("Message from server ", event.data);
  
  if(mList.value.length<5000){
    mList.value.push(event.data)
    nextTick(()=>bottom.value.scrollIntoView(false))
  }
  
});
const click = ()=>{
  const ele = document.querySelector('.bottom')
  let event = new MouseEvent('click')
  ele?.dispatchEvent(event)
}
onMounted(()=>{
  })
const mList = ref([])
</script>

<template>
<h1>messages</h1>
<div class="wrapper">
  <div v-for="item in mList">
  {{item}}
</div>
<div ref="bottom" class="bottom"></div>
</div>
</template>

<style lang='scss' scoped>
.a{
  height:500px
}
.wrapper{
  height:300px;
  overflow:auto;
  .bottom{
    display: inline-block;
    height:1px;
    width:100%;
    background:red
  }
}
</style>