#!/bin/bash

echo "🛍️ 启动 TikTok电商数据助手..."
echo "=================================="

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未安装Node.js，请先安装Node.js"
    exit 1
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ 未安装npm，请先安装npm"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 获取本地IP
LOCAL_IP=$(hostname -I | awk '{print $1}')
echo "🌐 你的本地IP地址: $LOCAL_IP"

# 启动服务器
echo "🚀 启动服务器..."
echo "----------------------------------"
echo "前端开发服务器: http://localhost:5173"
echo "模拟API服务器: http://localhost:3001"
echo "局域网访问: http://$LOCAL_IP:5173"
echo "----------------------------------"
echo "按 Ctrl+C 停止服务器"
echo ""

# 使用concurrently启动两个服务
npx concurrently \
  "npm run dev" \
  "npm run server"
