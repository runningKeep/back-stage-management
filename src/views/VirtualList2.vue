<script setup>
import {ref,reactive,onMounted, computed, nextTick} from 'vue'
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
const estimatedHeight = 80
const wrapperHeight = 300
const buffer = 2
const data = ref([])
let loading = ref(true)
const cardsData = ref([])
const height = computed(()=>{
  let lastCard = data.value[data.value.length-1]
  return lastCard?lastCard.offset+lastCard.height:0
})
let start = ref(0),end=ref(0)
const virtualInit = ()=>{
  let cards = document.querySelector('.cards-wrapper')
  let feakCards = document.getElementById('feak-cards')
  data.value = data.value.map((item,index)=>({
    offset:index*estimatedHeight,
    height:estimatedHeight,
    ifCalibration:false,
    ...item
  }))
  const dd = document.querySelector('.d')
  feakCards.style.height = height.value+'px'
  let initData = data.value.slice(0,6)
  cardsData.value = initData
  data.value[-1] = {offset:0,height:0}
  const handleScroll = (e)=>{
    let children = dd.children
    let c = Array.prototype.slice.call(children)
    c.forEach((child,index)=>{
        let h = child?.getBoundingClientRect?.().height
        let nodeData = data.value[start.value+index]
        if(!nodeData.ifCalibration){
          nodeData.height = h
          nodeData.offset = data.value[start.value+index-1].offset+data.value[start.value+index-1].height
          nodeData.ifCalibration = true
        }
      })
    let cards = document.querySelector('.cards-wrapper')
    let scrollTop = cards.scrollTop
    let s = data.value.findIndex((a)=>scrollTop<a.offset+a.height)
    let startTemp,endTemp
    startTemp = s
    let temp = 0
    if(startTemp!==start.value){
      feakCards.style.height = height.value+'px'
      while(temp<wrapperHeight&&s<data.value.length){
        temp+=data.value[s++].height
      }
      endTemp = s
      // 减去缓冲buffer的高度
      let bh = 0
      let i = startTemp-1,count = buffer
      while(i>=0&&count>0){
        bh+=data.value[i--].height
        count--
      }
      let sc = data.value[startTemp].offset-bh
      dd.style.transform=`translateY(${sc}px)`
      // 加上buffer
      startTemp = Math.max(0,startTemp-buffer)
      endTemp = Math.min(data.value.length,endTemp+buffer)
      let newData = data.value.slice(startTemp,endTemp)
      cardsData.value = newData
      start.value = startTemp
      end.value = endTemp
    }
  }

  cards.addEventListener('scroll',deBounce(handleScroll))
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
          <li class="card" v-for="item in cardsData">
            name:{{ item.name }}
            <br/>
            <span v-if="item.ifShow">cName:{{ item.cname }}</span>
            <br/>
            <span v-if="item.ifShow">address:{{ item.address }}</span>
          </li>
        </div>
      </div>
    </ul>
  </div>
   <div class="card-2">
    <li class="card" v-for="item in data">
            name:{{ item.name }}
            <br/>
            <span v-if="item.ifShow">cName:{{ item.cname }}</span>
            <br/>
            <span v-if="item.ifShow">address:{{ item.address }}</span>
          </li>
  </div>
  
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
  // height:50px;
}
.d{
  position: absolute;
  top:0
}
</style>