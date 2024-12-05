<script setup>
 import {ref,reactive} from 'vue'
 import data from './routeData.js'
</script>
<template>
    <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    router
  >
    <el-menu-item :index="item.path" v-for="item in data" index="2">
      <span>{{ item.menuName }}</span>
    </el-menu-item>
  </el-menu>
</template>

<style lang='scss' scoped>

</style>