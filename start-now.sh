#!/bin/bash
echo "🚀 启动TikTok电商助手..."
echo "前端: http://localhost:8888"
echo "API: http://localhost:3001/api/tiktok/shop-data"
echo "按 Ctrl+C 停止"

# 启动前端
npx vite --port 8888 --host 0.0.0.0 &
# 启动API
node server.js &