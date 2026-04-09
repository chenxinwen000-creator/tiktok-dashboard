// TikTok店铺模拟数据
export const mockShopData = {
  shopInfo: {
    name: "潮流服饰馆",
    id: "tt_shop_123456",
    owner: "张经理",
    createdAt: "2024-01-01",
    status: "active",
    level: "gold",
    rating: 4.8
  },
  
  dailyStats: {
    date: new Date().toISOString().split('T')[0],
    sales: 8924,
    orders: 156,
    visitors: 12480,
    conversionRate: 3.2,
    avgOrderValue: 294.18,
    revenue: 45892,
    newCustomers: 48,
    returningCustomers: 108
  },
  
  weeklyComparison: {
    currentWeek: {
      sales: 62480,
      orders: 892,
      revenue: 324560,
      growth: 12.5
    },
    previousWeek: {
      sales: 55500,
      orders: 780,
      revenue: 288400,
      growth: 8.2
    }
  },
  
  topProducts: [
    {
      id: "p001",
      name: "潮流印花T恤",
      category: "服装",
      sales: 1248,
      revenue: 62400,
      stock: 42,
      rating: 4.8,
      views: 24800,
      status: "hot"
    },
    {
      id: "p002",
      name: "无线蓝牙耳机",
      category: "电子产品",
      sales: 892,
      revenue: 178400,
      stock: 15,
      rating: 4.9,
      views: 35600,
      status: "hot"
    },
    {
      id: "p003",
      name: "运动瑜伽裤",
      category: "运动服饰",
      sales: 756,
      revenue: 45360,
      stock: 28,
      rating: 4.7,
      views: 19200,
      status: "normal"
    }
  ],
  
  hourlySales: [
    { hour: "00:00", sales: 1200, visitors: 800 },
    { hour: "04:00", sales: 1800, visitors: 1200 },
    { hour: "08:00", sales: 3200, visitors: 2800 },
    { hour: "12:00", sales: 5800, visitors: 5200 },
    { hour: "16:00", sales: 4200, visitors: 3800 },
    { hour: "20:00", sales: 8900, visitors: 7200 },
    { hour: "23:59", sales: 4500, visitors: 3200 }
  ],
  
  alerts: [
    {
      id: "a001",
      type: "warning",
      title: "库存预警",
      message: "3款商品库存低于安全线",
      priority: "high",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "a002",
      type: "error",
      title: "流量下降",
      message: "今日访客数较昨日下降15%",
      priority: "medium",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    }
  ]
};

// 生成随机数据（用于演示）
export function generateRandomData(baseData) {
  const randomFactor = 0.9 + Math.random() * 0.2; // 0.9-1.1
  
  return {
    ...baseData,
    dailyStats: {
      ...baseData.dailyStats,
      sales: Math.round(baseData.dailyStats.sales * randomFactor),
      revenue: Math.round(baseData.dailyStats.revenue * randomFactor),
      visitors: Math.round(baseData.dailyStats.visitors * randomFactor)
    }
  };
}
