<script setup lang="ts">
import { ref } from 'vue'
import { chatWithDeepseek } from '../services/deepseek'

const message = ref('')
const response = ref('')
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!message.value.trim()) return

  loading.value = true
  error.value = ''
  try {
    const result = await chatWithDeepseek([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message.value },
    ])
    response.value = result
  } catch (err) {
    console.error('发送消息失败:', err)
    error.value =
      err instanceof Error ? err.message : '发送消息失败，请稍后重试'
    response.value = ''
  } finally {
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
