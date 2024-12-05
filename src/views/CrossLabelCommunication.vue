<script setup>
import {ref,reactive,onUnmounted} from 'vue'
const channel = new BroadcastChannel('myChannel');
channel.postMessage('Hello from Tab 1!');
channel.onmessage=(e)=>{
  console.log(e,'tab 1 get message')
}
onUnmounted(()=>{
  channel.close()
})
let refer = null
const openWindow = ()=>{
  refer = window.open('/CrossLabelCommunication')
}
const postMessage = ()=>{
  refer.postMessage('mm')
}
const returnMessage = ()=>{
  window.opener?.postMessage('return')
}
window.addEventListener('message', function(event) {
  console.log(event.data); // 输出：Hello from Tab 1!
});
</script>

<template>
<div>cross-label</div>
<el-button @click="openWindow">open window</el-button>
<el-button @click="postMessage"> post message</el-button>
<el-button @click="returnMessage"> return message</el-button>
</template>

<style lang='scss' scoped>

</style>