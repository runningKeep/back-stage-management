<script setup>
import {ref,reactive,onMounted,onUnmounted} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
let clickOut = ref(0)
let showBox = ref(true)
const cb = ()=>{
  showBox.value = false
}
const box =ref()
const clickOutside = ()=>{
  let clickInside = false
  document.addEventListener('click',(e)=>{
    console.log(e,'ee')
    console.log(box.value,'boxvalue')
    console.log(e.target===box.value,'--')
    if(e.target!==box.value){
      cb()
    }
  },true)
}
onMounted(clickOutside)


const target = ref(null)

// onClickOutside(target, event => console.log(event))
// onUnmounted()
const ss = ref(null)
onMounted(()=>{
  window.addEventListener('click',(e)=>{
    console.log('window click')
    let a = e.composedPath()
    console.log(a,'a')
  })
  document.addEventListener('click',()=>{
    console.log('document')
  })
  target.value.addEventListener('click',(e)=>{
    e.stopPropagation()
    return false
  })
  ss.value.addEventListener('click',(e)=>{
    console.log('cc')
    e.stopPropagation()
    return false
})
})

function createPromise(){
  return new Promise((resolve,reject)=>{
    new Promise((a,b)=>{
      throw new Error()
    }).then().catch(()=>{
      console.log('err')
      resolve(3)
      reject(2)
    })
  })
}
createPromise().then(res=>{
  console.log(res,'--')
}).catch((err)=>{
  console.log(err,'err2')
})
</script>

<template>
<div v-if="showBox" class="box" ref="box"></div>
<div>{{ clickOut }}</div>
<el-button @click="showBox=true">show</el-button>
<el-button @click="toggleDark">toogle</el-button>

<div ref="target">
    Hello world
  </div>
  <div ref="ss">Outside element</div>
</template>

<style lang='scss' scoped>
.box{
  width:100px;
  height:100px;
  background-color: aqua;
}
</style>