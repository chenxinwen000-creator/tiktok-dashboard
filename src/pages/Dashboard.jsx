import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaVideo,
  FaHeart,
  FaComment,
  FaShare,
  FaFire,
  FaRocket,
  FaCrown,
  FaSync,
  FaFilter,
  FaDownload,
  FaBell,
  FaCog
} from 'react-icons/fa';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiPackage,
  FiClock
} from 'react-icons/fi';
import StatCard from '../components/StatCard';
import DataChart from '../components/DataChart';
import ProductCard from '../components/ProductCard';
import AlertPanel from '../components/AlertPanel';
import QuickActions from '../components/QuickActions';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today');
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(true);

  // 模拟数据
  const statsData = {
    today: {
      sales: 8924,
      orders: 156,
      visitors: 12480,
      conversion: 3.2,
      engagement: 4.8,
      revenue: 45892
    },
    week: {
      sales: 62480,
      orders: 892,
      visitors: 87240,
      conversion: 2.8,
      engagement: 4.2,
      revenue: 324560
    },
    month: {
      sales: 248000,
      orders: 3560,
      visitors: 348000,
      conversion: 2.5,
      engagement: 3.9,
      revenue: 1298000
    }
  };

  const [stats, setStats] = useState(statsData.today);

  useEffect(() => {
    setStats(statsData[timeRange]);
  }, [timeRange]);

  const tabs = [
    { id: 'overview', label: '数据总览', icon: <FaChartLine /> },
    { id: 'products', label: '商品分析', icon: <FaShoppingCart /> },
    { id: 'audience', label: '受众分析', icon: <FaUsers /> },
    { id: 'content', label: '内容分析', icon: <FaVideo /> },
    { id: 'ads', label: '广告分析', icon: <FaDollarSign /> }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* 顶部导航栏 */}
      <header className="glass-card sticky top-0 z-50 mx-4 mt-4 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
                <FaFire className="text-white text-xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TikTok电商助手</h1>
              <p className="text-sm text-gray-400">实时数据监控与分析</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <FaBell className="text-gray-300" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">店铺:</span>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/5 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                <span className="font-medium text-white">潮流服饰馆</span>
                <FaCrown className="text-yellow-400" />
              </div>
            </div>

            <button className="gradient-btn flex items-center space-x-2">
              <FaSync />
              <span>刷新数据</span>
            </button>
          </div>
        </div>

        {/* 标签栏 */}
        <div className="flex border-t border-white/10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 flex items-center justify-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-secondary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="p-4">
        {/* 时间筛选和操作栏 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            {['today', 'week', 'month'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-secondary to-accent text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {range === 'today' ? '今日' : range === 'week' ? '本周' : '本月'}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center space-x-2">
              <FiClock />
              <span>自定义</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center space-x-2">
              <FaFilter />
              <span>筛选</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white flex items-center space-x-2">
              <FaDownload />
              <span>导出</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white"
            >
              <FaCog />
            </button>
          </div>
        </div>

        {/* 数据统计卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <StatCard
            title="销售额"
            value={`¥${stats.revenue.toLocaleString()}`}
            change={12.5}
            icon={<FaDollarSign />}
            color="from-green-500 to-emerald-500"
            trend="up"
          />
          <StatCard
            title="订单数"
            value={stats.orders.toLocaleString()}
            change={8.2}
            icon={<FaShoppingCart />}
            color="from-blue-500 to-cyan-500"
            trend="up"
          />
          <StatCard
            title="访客数"
            value={stats.visitors.toLocaleString()}
            change={-3.1}
            icon={<FaUsers />}
            color="from-purple-500 to-pink-500"
            trend="down"
          />
          <StatCard
            title="转化率"
            value={`${stats.conversion}%`}
            change={15.7}
            icon={<FaChartLine />}
            color="from-orange-500 to-red-500"
            trend="up"
          />
          <StatCard
            title="互动率"
            value={`${stats.engagement}%`}
            change={5.3}
            icon={<FaHeart />}
            color="from-pink-500 to-rose-500"
            trend="up"
          />
          <StatCard
            title="商品数"
            value="342"
            change={2.4}
            icon={<FiPackage />}
            color="from-indigo-500 to-blue-500"
            trend="up"
          />
        </div>

        {/* 图表和内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* 销售趋势图 */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">销售趋势分析</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">实时更新</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <DataChart type="sales" />
            </div>
          </div>

          {/* 热门商品 */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">🔥 热销商品</h2>
              <button className="text-sm text-secondary hover:text-pink-400">
                查看全部
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <ProductCard key={i} rank={i} />
              ))}
            </div>
          </div>
        </div>

        {/* 底部区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 预警面板 */}
          <div className="lg:col-span-2">
            <AlertPanel />
          </div>

          {/* 快速操作 */}
          <QuickActions />
        </div>

        {/* 底部信息 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>数据最后更新: {new Date().toLocaleString('zh-CN')}</p>
          <p className="mt-1">系统运行状态: <span className="text-green-400">● 正常</span> | 下次更新: 5分钟后</p>
        </div>
      </main>

      {/* 浮动操作按钮 */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
        <FaRocket className="text-white text-xl" />
      </button>
    </div>
  );
};

export default Dashboard;
