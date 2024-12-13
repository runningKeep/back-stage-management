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
    height: 100vh;
    .sidebar{
    width:220px;
    height: 100%;
    overflow-y: auto;
    overflow-x: visible
  }
  .main{
    flex:1;
    padding:10px;
    // height:100%;
    overflow: auto;
  }
}
</style>