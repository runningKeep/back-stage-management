<script setup>
import {ref,reactive,onUnmounted} from 'vue'
const channel = new BroadcastChannel('myChannel');
channel.postMessage('Hello from Tab 2!');
channel.onmessage=(e)=>{
  console.log(e,'2 get message')
}
onUnmounted(()=>{
  console.log('close')
  channel.close()
})
</script>

<template>
<div>cross-label-2</div>
</template>

<style lang='scss' scoped>

</style>