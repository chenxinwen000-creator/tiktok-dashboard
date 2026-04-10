#!/bin/bash

echo "🔧 Codex问题修复脚本"
echo "===================="

# 1. 检查环境
echo "1. 检查环境..."
echo "   Node.js: $(node --version)"
echo "   npm: $(npm --version)"
echo "   Git: $(git --version)"

# 2. 安装依赖（如果缺少）
echo ""
echo "2. 安装依赖..."
if [ ! -d "node_modules" ]; then
    echo "   安装中..."
    npm install
else
    echo "   依赖已安装"
fi

# 3. 修复可能的配置问题
echo ""
echo "3. 修复配置..."
if [ ! -f "vite.config.js" ]; then
    echo "   创建vite.config.js..."
    cat > vite.config.js << 'VITECONFIG'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888,
    host: '0.0.0.0',
    open: true
  }
})
VITECONFIG
fi

# 4. 创建启动脚本
echo ""
echo "4. 创建启动脚本..."
cat > start-codex.sh << 'STARTSCRIPT'
#!/bin/bash
cd "$(dirname "$0")"

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
echo "   访问: http://localhost:8888"
echo "   按 Ctrl+C 停止"

npx vite --port 8888 --host 0.0.0.0
STARTSCRIPT

chmod +x start-codex.sh

# 5. 创建Codex说明文档
echo ""
echo "5. 创建说明文档..."
cat > CODEX_GUIDE.md << 'GUIDE'
# Codex使用指南

## 问题修复

如果Codex导入后无法编辑或运行：

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
./start-codex.sh
# 或
npx vite --port 8888 --host 0.0.0.0
```

### 3. 访问项目
- 本地: http://localhost:8888
- 局域网: http://你的IP:8888

## 项目结构
```
tiktok-dashboard/
├── src/                 # React组件
├── public/              # 静态资源
├── node_modules/        # 依赖包
├── package.json         # 项目配置
└── vite.config.js       # 构建配置
```

## 常见问题

### Q: 无法编辑文件？
A: 确保有写入权限，检查文件是否被锁定。

### Q: 页面空白？
A: 检查浏览器控制台错误，确保依赖安装正确。

### Q: 端口被占用？
A: 修改vite.config.js中的端口号。

## 开发命令
```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 技术支持
问题反馈: 钱钱 🦞 (电商助手)
GUIDE

echo ""
echo "✅ 修复完成！"
echo ""
echo "📋 可用命令:"
echo "   ./start-codex.sh      # 启动开发服务器"
echo "   npm run dev          # 开发模式"
echo "   npm run build        # 构建生产版本"
echo ""
echo "🔗 GitHub仓库:"
echo "   https://github.com/chenxinwen000-creator/tiktok-dashboard.git"
