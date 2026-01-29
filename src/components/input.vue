<script setup>
import {ref,reactive,defineExpose,useAttrs} from 'vue'

const props = defineProps({
  clearable: Boolean
})

const inputRef = ref(null)
const attrs = useAttrs()
console.log(attrs,'attrs')
defineExpose({
  clear: () => {
    inputRef.value.clear()
  }
})
</script>

<template>
  <el-input></el-input>
</template>

<style lang='scss' scoped>

</style>