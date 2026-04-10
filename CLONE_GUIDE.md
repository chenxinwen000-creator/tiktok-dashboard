# 📋 项目克隆指南

## 服务器Git仓库信息
- **仓库位置**: `ssh://root@服务器IP/~/tiktok-dashboard-remote.git`
- **项目目录**: `/root/tiktok-dashboard/`
- **部署目录**: `/root/tiktok-dashboard-deploy/` (自动部署)

## 克隆到本地
```bash
# 方法1：直接克隆（推荐）
git clone ssh://root@你的服务器IP/~/tiktok-dashboard-remote.git 本地目录

# 方法2：先克隆后添加远程
git clone ssh://root@你的服务器IP/~/tiktok-dashboard-remote.git 本地目录
cd 本地目录
git remote add origin ssh://root@你的服务器IP/~/tiktok-dashboard-remote.git
```

## 日常开发流程
```bash
# 1. 拉取最新代码
git pull origin master

# 2. 本地开发
# ... 编辑代码 ...

# 3. 提交更改
git add .
git commit -m "描述更改"

# 4. 推送到服务器
git push origin master

# 5. 服务器自动部署（如果配置了钩子）
```

## 服务器端管理
```bash
# 查看远程仓库
cd ~/tiktok-dashboard-remote.git
git log --oneline

# 手动部署
cd ~/tiktok-dashboard
git pull server-remote master
./restart-smart.sh
```

## 注意事项
1. 需要SSH访问权限
2. 确保服务器防火墙允许SSH连接
3. 建议配置SSH密钥认证，避免每次输入密码
