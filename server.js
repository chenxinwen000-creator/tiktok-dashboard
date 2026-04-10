import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 模拟TikTok API数据
app.get('/api/tiktok/shop-data', (req, res) => {
  const mockData = {
    timestamp: new Date().toISOString(),
    shop: {
      name: "潮流服饰馆",
      id: "tt_shop_123456",
      status: "active",
      today: {
        sales: Math.floor(8000 + Math.random() * 2000),
        orders: Math.floor(120 + Math.random() * 40),
        visitors: Math.floor(10000 + Math.random() * 3000),
        conversion: (2.5 + Math.random() * 1.5).toFixed(1),
        revenue: Math.floor(40000 + Math.random() * 10000)
      },
      weekly: {
        sales: 62480,
        orders: 892,
        revenue: 324560,
        growth: 12.5
      }
    },
    products: [
      {
        id: "p001",
        name: "潮流印花T恤",
        sales: 1248,
        revenue: 62400,
        stock: 42,
        status: "hot"
      },
      {
        id: "p002",
        name: "无线蓝牙耳机",
        sales: 892,
        revenue: 178400,
        stock: 15,
        status: "hot"
      }
    ],
    alerts: [
      {
        id: "a001",
        type: "warning",
        title: "库存预警",
        message: "3款商品库存低于安全线",
        time: "2小时前"
      }
    ]
  };
  
  res.json(mockData);
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 主页面
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 TikTok电商助手服务器已启动！`);
  console.log(`📊 本地访问: http://localhost:${PORT}`);
  console.log(`🌐 局域网访问: http://你的IP地址:${PORT}`);
  console.log(`📡 API端点: http://localhost:${PORT}/api/tiktok/shop-data`);
  console.log(`🔧 按 Ctrl+C 停止服务器`);
});
