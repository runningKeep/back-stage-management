<script setup>
 import {ref,reactive,onMounted} from 'vue'
 import { useRoute } from "vue-router";
 import Mock from 'mockjs'
let mock = Mock.mock({
 "array|200": [
  ()=>Mock.Random.dataImage('50x20',''),
 ]
})
 console.log(mock,'imgArr')
 mock.array[5] = new URL('../img/OIP.jpg',import.meta.url).href 
 const route =useRoute()
let num = ref()
let result2 = ref()

let circle = ref()
let start
let direction = true
const distance = 1000,period=10000
const animation = (timestamp)=>{
  if(!start) start=timestamp
  let dis = Math.min((timestamp-start)/period*distance,distance)
  let realDis = direction?dis:distance-dis
  circle.value.style.transform = `translateX(${realDis}px)`
  if(timestamp-start>period){
    start = timestamp
    direction = !direction
  }
  requestAnimationFrame(animation)
}
// onMounted(()=>requestAnimationFrame(animation))
// scroll event
const lazyLoad2 = ()=>{
  let dom = document.querySelector('.main')
  let imgList = document.querySelectorAll('.img')
  const height = 206
  for(let i=0;i<2;i++){
    imgList[i].src = imgList[i].getAttribute('data')
  }
  dom.addEventListener('scroll',()=>{
    let scrollTop = dom.scrollTop
    let idx = Math.ceil(scrollTop/height)
    idx = Math.max(0,idx)
    const img = imgList[idx]
    let src = img.getAttribute('src')
    let realSrc = img.getAttribute('data')
    if(!src){
      img.setAttribute('src',realSrc)
    }
  }) 
}
// IntersetionObserver
const lazyLoad = ()=>{
  let dom = document.querySelector('.main')
  let imgList = document.querySelectorAll('.img')
  const height = 206
  let options = {
    root: dom,
    rootMargin: "0px",
    threshold: [0.1,0.1,0.25,1],
    // threshold: buildThresholdList(),
  }
  const handler = (e,img)=>{
    console.log('cc')
    e.forEach((change)=>{
      // if(change.intersectionRatio==1){
      if(change.isIntersecting){
        let src = img.getAttribute('src')
        let realSrc = img.getAttribute('data')
        if(!src){
          img.setAttribute('src',realSrc)
        }
      }
    })
  }
  imgList.forEach(img=>{
    const observer = new IntersectionObserver((e)=>handler(e,img),options)
    observer.observe(img)
  })
}
// onMounted(lazyLoad)
</script>

<template>
  <div>LazyLoadImg multiple methods</div>
  <el-divider/>
  <div>calculate result:{{result2}}</div>
  <div>requestAnimationFrame</div>
  <div class="circle" ref="circle"></div>
  <el-divider/>
  <div class="img-wrapper">
    <div  v-for="item in mock.array" >
      <img loading="lazy" class="img" :src="item" :data="item" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.circle{
  background-color: aqua;
  width:100px;
  height:100px;
  border-radius: 50px;
}
.img-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img{
  width:350px;
  height:200px
}
</style>