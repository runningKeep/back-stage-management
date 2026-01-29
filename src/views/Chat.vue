<script setup>
import {ref,reactive} from 'vue'
import OpenAI from 'openai'
const config = {
  apiKey:'sk-078c843425d140e285e44cde85022d0e',
  baseURL:'https://api.siliconflow.cn/v1'
}
const openai = new OpenAI(config)
const chosen_model = 'deepseek-ai/DeepSeek-R1'
 async function getDeepseekReply(prompt) {
  console.log('🚀🚀🚀 / prompt', prompt)
  const response = await openai.chat.completions.create({
    messages: [
      // { role: 'system', content: env.DEEPSEEK_SYSTEM_MESSAGE },
      { role: 'user', content: prompt },
    ],
    model: chosen_model,
  })
  console.log('🚀🚀🚀 / reply', response.choices[0].message.content)
  return `${response.choices[0].message.content}`
}
const content = ref('')
const answer = ref()
const quiz = ()=>{
  getDeepseekReply(content.value).then(res=>{
    answer.value = res
  })
}
</script>

<template>
  <el-input v-model="content"></el-input>
  <el-button @click="quiz">click</el-button>
  <div>{{ answer }}</div>
</template>

<style lang='scss' scoped>

</style>