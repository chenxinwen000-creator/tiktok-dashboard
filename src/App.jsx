import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Parser1688Page from './pages/1688ParserPage';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-transparent border-t-secondary border-r-accent rounded-full animate-spin mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-6 mb-2">加载 TikTok 电商助手...</h2>
          <p className="text-gray-400">正在初始化系统</p>
        </div>
      </div>
    );
  }

  // 导航栏
  const Navigation = () => (
    <nav className="glass-card fixed top-4 left-4 right-4 z-50 p-4 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">🛍️</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">TikTok电商助手</h1>
            <p className="text-sm text-gray-400">多平台运营工具</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === 'dashboard'
                ? 'bg-gradient-to-r from-secondary to-accent text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            数据仪表盘
          </button>
          <button
            onClick={() => setCurrentPage('1688')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === '1688'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            1688解析工具
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navigation />
      <div className="pt-24 px-4">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === '1688' && <Parser1688Page />}
      </div>
    </div>
  );
}

export default App;
