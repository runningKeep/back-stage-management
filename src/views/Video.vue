<script setup>
import {ref,reactive} from 'vue'
const video = ref(null)
const changeRate = ()=>{
  const video = document.getElementById('video')
  if(rate.value<6){
    rate.value = video.playbackRate = video.playbackRate+0.5
  }else if(rate.value===6){
    rate.value = video.playbackRate = 0.1
  }
  
}
const stop = ()=>{
  video.value.pause()
}
const mute = ()=>{
  video.value.muted = !video.value.muted
}
const rate = ref(1)
</script>

<template>
  <div class="video-wrapper">
<video
  ref="video"
  controls
  id="video"
  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  width="620">
  抱歉，你的浏览器不支持嵌入式视频，不过不用担心，你可以<a
    href="https://archive.org/details/BigBuckBunny_124"
    >下载</a
  >并用你最喜欢的视频播放器观看！
</video>
<div class="controler">
  <!-- <el-button class="rate" @click="changeRate">{{ rate }}</el-button>
  <el-button @click="stop">stop</el-button>
  <el-button @click="mute">mute</el-button> -->
</div>

</div>
</template>

<style lang='scss' scoped>
.video-wrapper{
  position: relative;
  .controler{
    position: absolute;
    bottom:20px;
    left:100px
  }
}
</style>