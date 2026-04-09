#!/bin/bash

echo "🛑  停止 TikTok电商助手..."

if [ -f "/tmp/tiktok-dashboard.pid" ]; then
    source /tmp/tiktok-dashboard.pid
    
    if [ ! -z "$VITE_PID" ] && ps -p $VITE_PID > /dev/null 2>&1; then
        echo "   停止Vite前端 (PID: $VITE_PID)"
        kill -9 $VITE_PID 2>/dev/null
    fi
    
    if [ ! -z "$SERVER_PID" ] && ps -p $SERVER_PID > /dev/null 2>&1; then
        echo "   停止API服务器 (PID: $SERVER_PID)"
        kill -9 $SERVER_PID 2>/dev/null
    fi
    
    rm -f /tmp/tiktok-dashboard.pid
    echo "✅  服务已停止"
else
    echo "ℹ️  未找到运行中的服务"
    
    # 尝试查找并停止相关进程
    PIDS=$(ps aux | grep -E "(vite|node.*server.js)" | grep -v grep | awk '{print $2}')
    if [ ! -z "$PIDS" ]; then
        echo "   发现相关进程: $PIDS"
        read -p "   是否停止这些进程？(y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo $PIDS | xargs kill -9 2>/dev/null
            echo "✅  已停止相关进程"
        fi
    fi
fi

# 清理日志文件
LOG_FILE="/tmp/tiktok-dashboard.log"
if [ -f "$LOG_FILE" ]; then
    read -p "   是否清理日志文件？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -f "$LOG_FILE"
        echo "🗑️  日志文件已清理"
    fi
fi
