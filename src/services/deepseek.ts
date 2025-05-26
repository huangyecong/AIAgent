import type { ChatMessage } from '../types'

const API_URL = 'https://api.deepseek.com/chat/completions'

export async function chatWithDeepseek(messages: ChatMessage[]) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(
        `API请求失败: ${response.status}\n` +
        `错误信息: ${errorData ? JSON.stringify(errorData) : '无法获取详细错误信息'}`
      )
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('调用Deepseek API时出错:', error)
    throw error
  }
}