import React, { useEffect, useState } from 'react';
import {
  FaBell,
  FaChartLine,
  FaCog,
  FaDollarSign,
  FaDownload,
  FaFilter,
  FaFire,
  FaShoppingCart,
  FaSync,
  FaUsers,
  FaVideo
} from 'react-icons/fa';
import { FiClock, FiPackage } from 'react-icons/fi';
import AlertPanel from '../components/AlertPanel';
import DataChart from '../components/DataChart';
import ProductCard from '../components/ProductCard';
import QuickActions from '../components/QuickActions';
import StatCard from '../components/StatCard';

const statsData = {
  today: {
    revenue: 45892,
    orders: 156,
    visitors: 12480,
    conversion: 3.2,
    engagement: 4.8,
    products: 342
  },
  week: {
    revenue: 324560,
    orders: 892,
    visitors: 87240,
    conversion: 2.8,
    engagement: 4.2,
    products: 342
  },
  month: {
    revenue: 1298000,
    orders: 3560,
    visitors: 348000,
    conversion: 2.5,
    engagement: 3.9,
    products: 342
  }
};

const tabs = [
  { id: 'overview', label: '数据总览', icon: <FaChartLine /> },
  { id: 'products', label: '商品分析', icon: <FaShoppingCart /> },
  { id: 'audience', label: '人群分析', icon: <FaUsers /> },
  { id: 'content', label: '内容分析', icon: <FaVideo /> },
  { id: 'ads', label: '广告分析', icon: <FaDollarSign /> }
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today');
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(statsData.today);

  useEffect(() => {
    setStats(statsData[timeRange]);
  }, [timeRange]);

  return (
    <div className="mx-auto max-w-7xl">
      <header className="glass-card sticky top-24 z-40 rounded-2xl border border-white/10">
        <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent">
                <FaFire className="text-white text-xl" />
              </div>
              <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-gray-900 bg-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">实时数据看板</h2>
              <p className="text-sm text-gray-400">聚合店铺销售、内容与流量趋势</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button className="relative rounded-lg bg-white/5 p-2 text-gray-300 transition-colors hover:bg-white/10">
              <FaBell />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </button>
            <div className="rounded-lg bg-white/5 px-3 py-2 text-sm text-gray-300">
              当前店铺: 潮流服饰旗舰店
            </div>
            <button className="gradient-btn flex items-center gap-2">
              <FaSync />
              <span>刷新数据</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap border-t border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm transition-all md:flex-1 ${
                activeTab === tab.id
                  ? 'border-b-2 border-secondary text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <section className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'today', label: '今日' },
            { id: 'week', label: '本周' },
            { id: 'month', label: '本月' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                timeRange === range.id
                  ? 'bg-gradient-to-r from-secondary to-accent text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {range.label}
            </button>
          ))}
          <button className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
            <FiClock />
            <span>自定义</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
            <FaFilter />
            <span>筛选</span>
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-300 hover:bg-white/10">
            <FaDownload />
            <span>导出</span>
          </button>
          <button className="rounded-lg bg-white/5 p-2 text-gray-300 hover:bg-white/10">
            <FaCog />
          </button>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        <StatCard title="销售额" value={`¥${stats.revenue.toLocaleString()}`} change={12.5} icon={<FaDollarSign />} color="from-green-500 to-emerald-500" trend="up" />
        <StatCard title="订单数" value={stats.orders.toLocaleString()} change={8.2} icon={<FaShoppingCart />} color="from-blue-500 to-cyan-500" trend="up" />
        <StatCard title="访客数" value={stats.visitors.toLocaleString()} change={-3.1} icon={<FaUsers />} color="from-purple-500 to-pink-500" trend="down" />
        <StatCard title="转化率" value={`${stats.conversion}%`} change={15.7} icon={<FaChartLine />} color="from-orange-500 to-red-500" trend="up" />
        <StatCard title="互动率" value={`${stats.engagement}%`} change={5.3} icon={<FaBell />} color="from-pink-500 to-rose-500" trend="up" />
        <StatCard title="商品数" value={stats.products.toString()} change={2.4} icon={<FiPackage />} color="from-indigo-500 to-blue-500" trend="up" />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="glass-card h-full p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">销售趋势分析</h3>
                <p className="text-sm text-gray-400">按小时查看订单和销售变化</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>实时更新</span>
              </div>
            </div>
            <DataChart type="sales" />
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">热门商品</h3>
            <button className="text-sm text-secondary hover:text-pink-300">查看全部</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((rank) => (
              <ProductCard key={rank} rank={rank} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AlertPanel />
        </div>
        <QuickActions />
      </section>

      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>最后更新时间: {new Date().toLocaleString('zh-CN')}</p>
        <p className="mt-1">系统状态: <span className="text-green-400">正常</span> | 下次刷新: 5 分钟后</p>
      </footer>
    </div>
  );
};

export default Dashboard;
