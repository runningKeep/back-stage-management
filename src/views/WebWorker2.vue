<script setup>
 import {ref,reactive} from 'vue'
 import { useRoute } from "vue-router";
 const route =useRoute()
 let result = ref()
 let url = new URL('./sharedWorker.js',import.meta.url).href
 console.log(url,'url');
 const worker = new SharedWorker(url)
 worker.port.onmessage = (event) => {
  result2.value = event.data
  console.log(`Got: ${event.data}`);
};

worker.onerror = (error) => {
  console.log(`Worker error: ${error.message}`);
  throw error;
};

const onsubmit = (val) => {
  worker.port.postMessage({path:route.path,data:[val]});
};
const calculate = () => {
  worker.postMessage({type:'2'});
};
let num = ref()
let result2 = ref()
</script>

<template>
<div>webworker</div>
<el-input @change="onsubmit" v-model="num"></el-input>
<div>{{result}}</div>
<el-divider/>
<div>calculate result:{{result2}}</div>
</template>

<style lang='scss' scoped>
</style>