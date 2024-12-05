<script setup>
 import {ref,reactive} from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Sidebar  from './sidebar.vue';
</script>

<template>
  <div class="wrapper">
    <Sidebar class="sidebar"/>
    <div class="main">
    <RouterView/>
  </div>
  </div>
  </template>

<style lang='scss' scoped>
.wrapper{
  display: flex;
  .sidebar{
    width:200px;
    min-height: 100vh;
  }
  .main{
    flex:1;
    padding:10px
  }
}
</style>