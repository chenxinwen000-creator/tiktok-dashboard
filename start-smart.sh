#!/bin/bash

PORT=8888
PROJECT_NAME="TikTok电商助手"
PROJECT_DIR="$HOME/tiktok-dashboard"
LOG_FILE="/tmp/tiktok-dashboard.log"

echo "🛍️  启动 $PROJECT_NAME..."
echo "=========================================="

# 检查端口占用
check_port() {
    if netstat -tulpn 2>/dev/null | grep -q ":$PORT "; then
        PID=$(netstat -tulpn 2>/dev/null | grep ":$PORT " | awk '{print $7}' | cut -d'/' -f1)
        PROCESS=$(ps -p $PID -o comm= 2>/dev/null)
        
        echo "⚠️  端口 $PORT 已被占用！"
        echo "   进程ID: $PID"
        echo "   进程名: $PROCESS"
        
        if [[ "$PROCESS" == *"node"* ]] || [[ "$PROCESS" == *"vite"* ]]; then
            echo "✅  检测到是我们的项目进程"
            read -p "   是否终止进程 $PID 并重新启动？(y/N): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                kill -9 $PID 2>/dev/null
                echo "🗑️  已终止进程 $PID"
                sleep 2
                return 0
            else
                echo "❌  用户取消启动"
                exit 1
            fi
        else
            echo "❌  检测到未知进程占用端口"
            echo "   请手动检查或选择其他端口"
            exit 1
        fi
    fi
    return 0
}

# 安装依赖（如果需要）
install_deps() {
    if [ ! -d "node_modules" ]; then
        echo "📦  安装依赖..."
        npm install
    fi
}

# 获取IP信息
get_ip_info() {
    LOCAL_IP=$(hostname -I | awk '{print $1}')
    PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || echo "未知")
    
    echo "🌐  网络信息:"
    echo "   本地IP: $LOCAL_IP"
    echo "   公网IP: $PUBLIC_IP"
    echo ""
    echo "🔗  访问地址:"
    echo "   本地访问: http://localhost:$PORT"
    echo "   局域网访问: http://$LOCAL_IP:$PORT"
    echo "   (通过SSL通道访问)"
}

# 启动项目
start_project() {
    echo "🚀  启动项目..."
    echo "   端口: $PORT"
    echo "   目录: $PROJECT_DIR"
    echo "   日志: $LOG_FILE"
    echo ""
    
    # 启动Vite服务器（固定端口8888）
    nohup npx vite --port $PORT --host 0.0.0.0 > "$LOG_FILE" 2>&1 &
    VITE_PID=$!
    
    # 启动模拟API服务器（端口3001）
    nohup node server.js >> "$LOG_FILE" 2>&1 &
    SERVER_PID=$!
    
    echo "📝  进程信息:"
    echo "   Vite前端: PID $VITE_PID (端口 $PORT)"
    echo "   API服务器: PID $SERVER_PID (端口 3001)"
    echo ""
    
    # 保存PID到文件，方便后续管理
    echo "VITE_PID=$VITE_PID" > /tmp/tiktok-dashboard.pid
    echo "SERVER_PID=$SERVER_PID" >> /tmp/tiktok-dashboard.pid
    echo "PORT=$PORT" >> /tmp/tiktok-dashboard.pid
    
    # 等待启动
    echo "⏳  等待服务器启动..."
    sleep 5
    
    # 检查是否启动成功
    if curl -s http://localhost:$PORT > /dev/null 2>&1; then
        echo "✅  $PROJECT_NAME 启动成功！"
        echo ""
        get_ip_info
        echo ""
        echo "📋  管理命令:"
        echo "   查看日志: tail -f $LOG_FILE"
        echo "   停止服务: ./stop-smart.sh"
        echo "   重启服务: ./restart-smart.sh"
        echo ""
        echo "🎮  按 Ctrl+C 查看日志，或直接关闭终端"
        echo "=========================================="
        
        # 显示最后几行日志
        echo "📄  最近日志:"
        tail -5 "$LOG_FILE"
        echo ""
        echo "🔍  实时日志查看: tail -f $LOG_FILE"
    else
        echo "❌  启动失败，请检查日志: $LOG_FILE"
        exit 1
    fi
}

# 主流程
main() {
    cd "$PROJECT_DIR" || {
        echo "❌  无法进入项目目录: $PROJECT_DIR"
        exit 1
    }
    
    check_port
    install_deps
    start_project
    
    # 保持脚本运行，等待Ctrl+C
    trap 'echo ""; echo "👋  服务仍在运行，使用 ./stop-smart.sh 停止"; exit 0' INT
    while true; do
        sleep 3600
    done
}

main "$@"
