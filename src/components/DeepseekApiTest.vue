<script setup lang="ts">
import { ref } from 'vue'
import { chatWithDeepseek } from '../services/deepseek'

const message = ref('') // 用户输入的消息
const response = ref('') // AI的响应内容
const loading = ref(false) // 加载状态
const error = ref('') // 错误信息

async function handleSubmit() {
  // 空消息检查
  if (!message.value.trim()) return

  // 设置加载状态
  loading.value = true
  error.value = ''
  try {
    // 调用API
    /** Deepseek API的对话格式要求（官网文档地址：https://api-docs.deepseek.com/zh-cn/）
    数组中的每个对象都是一个消息（ChatMessage类型），包含两个属性：
    - role ：表示消息的发送者角色
    - content ：表示消息的具体内容
    **/
    const result = await chatWithDeepseek([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message.value },
    ])
    // 设置响应
    response.value = result
  } catch (err) {
    // 错误处理
    console.error('发送消息失败:', err)
    error.value =
      err instanceof Error ? err.message : '发送消息失败，请稍后重试'
    response.value = ''
  } finally {
    // 重置加载状态
    loading.value = false
  }
}
</script>

<template>
  <div class="chat-container">
    <div class="input-area">
      <input
        v-model="message"
        type="text"
        placeholder="输入消息..."
        @keyup.enter="handleSubmit"
      />
      <button @click="handleSubmit" :disabled="loading">
        {{ loading ? '发送中...' : '发送' }}
      </button>
    </div>
    <div class="error-message" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="response-area" v-if="response">
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<style scoped>
.error-message {
  margin: 10px 0;
  padding: 10px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
}

.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.response-area {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
  white-space: pre-wrap;
}
</style>
