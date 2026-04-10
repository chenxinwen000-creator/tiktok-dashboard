#!/bin/bash

echo "🚀 启动简化版TikTok电商助手..."
echo "=================================="

# 备份原配置
if [ -f "vite.config.js" ]; then
    mv vite.config.js vite.config.backup.js
fi
if [ -f "src/App.jsx" ]; then
    mv src/App.jsx src/App.backup.jsx
fi

# 使用简化配置
cp vite.config.simple.js vite.config.js
cp src/App.simple.jsx src/App.jsx

# 启动
npx vite --port 8888 --host 0.0.0.0

# 恢复原配置（退出时）
trap 'cleanup' INT TERM EXIT

cleanup() {
    echo "恢复原配置..."
    if [ -f "vite.config.backup.js" ]; then
        mv vite.config.backup.js vite.config.js
    fi
    if [ -f "src/App.backup.jsx" ]; then
        mv src/App.backup.jsx src/App.jsx
    fi
    exit 0
}
