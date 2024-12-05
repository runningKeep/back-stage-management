<script setup>
 import {ref,reactive,onUnmounted} from 'vue'
 import { useRoute } from "vue-router";
 const route =useRoute()
 console.log(route,'ee');
 let result = ref()
 let url = new URL('./worker.js',import.meta.url).href
 console.log(url,'url');
 const worker = new Worker(url)
 worker.onmessage = (event) => {
  console.log(event.data.data,'event.data.data');
  console.log(event.data.type,'event.data.data');
  if(event.data.type==='1'){

  }
  switch(event.data.type){
    case('1'):{
      result.value = event.data.data;
      break;
    }
    case('2'):{
      result2.value = event.data.data;
    }
  }
    
  
  console.log(`Got: ${event.data}`);
};

worker.onerror = (error) => {
  console.log(`Worker error: ${error.message}`);
  throw error;
};

const onsubmit = (val) => {
  worker.postMessage({type:'1',data:val});
};
const calculate = () => {
  worker.postMessage({type:'2'});
};
let num = ref()
let result2 = ref()

let url2 = new URL('./sharedWorker.js',import.meta.url).href
const worker2 = new SharedWorker(url2)
let input2 = ref()
let input3 = ref()
let result3 = ref()
const triggerSharedWorker = (val)=>{
  worker2.port.postMessage({path:route.path,data:[input2.value,input3.value]})
}
worker2.port.onmessage=(e)=>{
  console.log(e.data,'--');
  result3.value = e.data
}
onUnmounted(()=>{
  console.log('unmount');
  worker2.port.close()
  worker.terminate()
})
</script>

<template>
<div>webworker</div>
<el-input @change="onsubmit" v-model="num"></el-input>
<div>{{result}}</div>
<el-divider/>
<el-button @click="calculate">Intensive computing</el-button>
<div>calculate result:{{result2}}</div>
<div class="box"></div>
<el-divider/>
shared worker
<el-input v-model="input2" @change="triggerSharedWorker"/>
<el-input v-model="input3" @change="triggerSharedWorker"/>
<div>result:{{result3}}</div>
</template>

<style lang='scss' scoped>
.box{
  background:blue;
  width:100px;
  height:100px;
  border-radius:50px;
  animation: 3s ease-in 1s infinite reverse both running slidein;
}
@keyframes slidein{
  from{
    margin-left:-100px;
  }
  to{
    margin-left:calc(100vw - 400px)
  }
}
</style>