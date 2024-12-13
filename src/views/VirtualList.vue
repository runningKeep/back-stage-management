<script setup>
 import {ref,reactive,onMounted} from 'vue'
 import Mock from 'mockjs'
 import { throttle,deBounce } from '@/utils';
 let url = new URL('./mock-worker.js',import.meta.url).href
 console.log(url,'url');
 const worker = new Worker(url,{type:'module'})
 worker.onmessage = (e)=>{
  loading.value = false
  console.log(e.data,'--')
  data.value = e.data.array
  virtualInit()
 }
 const data = ref([])
 let loading = ref(true)
const cardsData = ref([])
const buffer = 3
const virtualInit = ()=>{
  let cards = document.querySelector('.cards-wrapper')
  let feakCards = document.getElementById('feak-cards')
  const dd = document.querySelector('.d')
  let height = 50*data.value.length
  feakCards.style.height = height+'px'
  let count = 0
  let initData = data.value.slice(0,6)
  cardsData.value = initData

  const handleScroll = (e)=>{
  let cards = document.querySelector('.cards-wrapper')
  console.log('scroll')
    let scrollTop = cards.scrollTop
    let imCount = Math.floor(scrollTop/50)
    if(imCount!==count){
      // dd.style.top=scrollTop+'px'
      let amend = scrollTop%50
      let actualBuffer = imCount-buffer>0?buffer:imCount
      dd.style.transform=`translateY(${scrollTop-amend-actualBuffer*50}px)`
      let im = Math.max(0,imCount-buffer)
      // im = imCount
      let end = Math.min(imCount+6+buffer,data.value.length)
      console.log(im,end,'--')
      let newData = data.value.slice(im,end)
      cardsData.value = newData
      count = imCount
    }
  }

  cards.addEventListener('scroll',deBounce(handleScroll,16))
}
// onMounted(virtualInit)
const handleClick = ()=>{
  console.log('click')
}
const cc = deBounce(handleClick,1000)
</script>

<template>
<div>Virtual List</div>
<div >
  <!-- <el-table :data="data">
    <el-table-column prop="name" label="name" align="center" ></el-table-column>
    <el-table-column prop="height" label="height" align="center" ></el-table-column>
    <el-table-column prop="age" label="age" align="center" ></el-table-column>
    <el-table-column prop="address" label="address" align="center" ></el-table-column>
    <el-table-column prop="province" label="province" align="center" ></el-table-column>
    <el-table-column prop="province" label="province" align="center" >
      <template #default="{row}">
        <img :src="row.img"/>
      </template>
    </el-table-column>
  </el-table> -->
  <el-button @click="cc">click</el-button>
  <div class="wrapper" v-loading="loading">
    <ul class="cards-wrapper" ref="">
      <div id="feak-cards">
        <div class="d">
          <li class="card" v-for="item in cardsData">name:{{ item.name }}</li>
        </div>
      </div>
    </ul>
  </div>
   <!-- <div class="card-2">
      <li v-for="item in data">name:{{ item.name }}</li>
  </div> -->
  
</div>
</template>

<style lang='scss' scoped>
.wrapper{
  display: flex;
  margin-top:50px
}
.card-2{
  flex:1;
  height:300px;
  overflow: auto;
}
.cards-wrapper{
  flex:1;
  position: relative;
  height:300px;
  overflow: auto;
  border: 1px solid;
}
.card{
  height:50px;
}
.d{
  position: absolute;
  top:0
}
</style>