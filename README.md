# AI Agent 学习项目

这是跟随极客时间《跟着月影学前端智能体开发》课程的学习记录项目。项目使用Vue 3 + TypeScript + Vite技术栈，实现了与Deepseek API的集成，用于学习和实践AI智能体开发。

## 课程信息

- 课程名称：《跟着月影学前端智能体开发》
- 课程平台：极客时间
- 项目定位：课程学习代码和笔记记录

## 技术栈

- Vue 3.5.13 - 渐进式JavaScript框架
- TypeScript - JavaScript的超集，添加了类型系统
- Vite - 下一代前端构建工具
- Deepseek API - AI对话接口

## 项目功能

- 实现了基于Deepseek API的AI对话功能
- 使用Vue 3组合式API进行开发
- 集成TypeScript类型支持
- 使用Vite构建工具
- 规范的Git提交（使用commitizen）

## 开始使用

### 环境要求

- Node.js >= 18.x
- npm >= 9.x

### 安装依赖

```bash
npm install
```
### 环境变量配置
1. 在项目根目录创建 .env.local 文件
2. 添加Deepseek API密钥：
   ```plaintext
    VITE_DEEPSEEK_API_KEY=你的API密钥
   ``` 
### 开发服务器
```bash
npm run dev
```
### 构建项目
```bash
npm run build
```
### 预览构建结果
```bash
npm run preview
```
## Git提交规范
项目使用commitizen进行规范化的Git提交，提交代码时使用：

```bash
git cz
```
## 项目结构
```plaintext
├── src/
│   ├── assets/        # 静态资源
│   ├── components/    # Vue组件
│   │   └── DeepseekApiTest.vue  # Deepseek API测试
组件
│   ├── services/      # API服务
│   │   └── deepseek.ts  # Deepseek API服务封装
│   ├── types/         # TypeScript类型定义
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── public/            # 公共资源
└── vite.config.ts     # Vite配置文件
```
## 相关文档
- Vue 3文档
- TypeScript文档
- Vite文档
- Deepseek API文档