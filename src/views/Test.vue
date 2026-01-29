<script setup>
import {ref,reactive,onMounted} from 'vue'
import Input from '@/components/input.vue'
const arr = ref(['a','b','c'])
const del = (n)=>{
  let idx = arr.value.findIndex(a=>a===n)
  idx>-1&&(arr.value.splice(idx,1))
}


const throtle = function(fn,t){
  let ti
  return function(){
    if(ti){
      clearTimeout(ti)
    }
    ti = setTimeout(()=>fn.apply(arguments,this),t)
  }
}
const fn = ()=>{
    console.log('click')
}
const name = ref()
const blurInput = ()=>{
  console.log('blur')
}
const inputRef = ref(null)
const clearInput = ()=>{
  // inputRef.value.clear()
  console.log(inputRef)
}
onMounted(()=>{
  window.postMessage((()=>{
    console.log('post')
  })())
  setTimeout(() => {
    console.log('timeout')
  }, 0);
  Promise.resolve(2).then(()=>{
    console.log('promise')
  })
})
</script>

<template>
<div>test</div>
<ul>
  <li v-for="(n,index) in arr" :key="index">{{ n }}   <span @click="del(n)">del</span></li>
</ul>
<button @click="clearInput">clear</button>
<Input clearable v-model="name" @blur="blurInput" ref="inputRef"></Input>
</template>

<style lang='scss' scoped>

</style>