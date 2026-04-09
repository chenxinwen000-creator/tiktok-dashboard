#!/bin/bash

echo "🔄  重启 TikTok电商助手..."

# 先停止
if [ -f "./stop-smart.sh" ]; then
    ./stop-smart.sh
    sleep 2
fi

# 再启动
if [ -f "./start-smart.sh" ]; then
    ./start-smart.sh
else
    echo "❌  找不到启动脚本"
    exit 1
fi
