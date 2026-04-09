# 🛍️ TikTok电商数据助手

一个酷炫、现代化的TikTok店铺数据监控仪表盘，专为局域网环境设计。

## ✨ 特性

- 🎨 **酷炫UI设计** - 电商风格的现代化界面，玻璃态效果，动画过渡
- 📊 **实时数据展示** - 模拟TikTok店铺运营数据
- 🔔 **智能预警系统** - 库存、流量、订单实时监控
- ⚡ **快速操作** - 一键优化、数据同步、报告生成
- 🌐 **局域网专用** - 无需复杂授权，开箱即用
- 📱 **响应式设计** - 适配桌面和移动设备

## 🚀 快速开始

### 安装依赖
```bash
cd ~/tiktok-dashboard
npm install
```

### 启动开发服务器
```bash
# 启动前端开发服务器
npm run dev

# 启动模拟API服务器（另一个终端）
npm run server
```

### 构建生产版本
```bash
npm run build
npm run preview
```

## 🌐 访问方式

### 开发环境
- 本地访问: http://localhost:5173
- API端点: http://localhost:3001/api/tiktok/shop-data

### 局域网访问
1. 获取服务器IP地址:
   ```bash
   hostname -I
   ```

2. 在其他设备访问:
   ```
   http://[服务器IP]:5173
   ```

## 📁 项目结构

```
tiktok-dashboard/
├── src/
│   ├── components/     # React组件
│   │   ├── StatCard.jsx      # 数据卡片
│   │   ├── DataChart.jsx     # 图表组件
│   │   ├── ProductCard.jsx   # 商品卡片
│   │   ├── AlertPanel.jsx    # 预警面板
│   │   └── QuickActions.jsx  # 快速操作
│   ├── pages/
│   │   └── Dashboard.jsx     # 主仪表盘
│   ├── styles/
│   │   └── globals.css       # 全局样式
│   └── App.jsx               # 主应用
├── public/              # 静态资源
├── config/              # 配置文件
├── server.js            # 模拟API服务器
└── package.json         # 依赖配置
```

## 🔧 配置说明

### 修改主题颜色
编辑 `src/styles/globals.css` 中的CSS变量:
```css
:root {
  --primary: #000000;      /* 主色 */
  --secondary: #FF0050;    /* 次要色（TikTok红） */
  --accent: #00F2EA;       /* 强调色 */
}
```

### 修改模拟数据
编辑 `config/mockData.js` 中的 `mockShopData` 对象。

### 调整刷新频率
编辑 `config/settings.json` 中的 `refreshInterval`（单位：毫秒）。

## 🎨 设计特色

1. **玻璃态效果** - 毛玻璃背景，现代化设计
2. **渐变色彩** - TikTok风格的红蓝渐变
3. **动画过渡** - 平滑的悬停和加载动画
4. **响应式布局** - 自适应各种屏幕尺寸
5. **实时更新** - 模拟实时数据变化

## 🔮 未来扩展

- [ ] 连接真实TikTok API
- [ ] 添加用户认证系统
- [ ] 实现数据导出功能
- [ ] 添加多店铺管理
- [ ] 集成AI运营建议

## 📄 许可证

MIT License - 仅供学习和内部使用

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

**提示**: 这是一个演示项目，使用模拟数据。如需连接真实TikTok店铺，需要申请TikTok Shop API权限。
