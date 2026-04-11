import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Parser1688Page from './pages/1688ParserPage';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        <div className="text-center">
          <div className="relative mx-auto h-24 w-24">
            <div className="h-24 w-24 rounded-full border-4 border-transparent border-t-secondary border-r-accent animate-spin" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-secondary to-accent animate-pulse" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">正在加载 TikTok 电商助手</h2>
          <p className="mt-2 text-gray-400">初始化数据面板与采集工具中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <nav className="fixed left-4 right-4 top-4 z-50 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold">TikTok 电商助手</h1>
            <p className="text-sm text-gray-400">数据看板与 1688 商品解析工具</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`rounded-lg px-4 py-2 font-medium transition-all ${
                currentPage === 'dashboard'
                  ? 'bg-gradient-to-r from-secondary to-accent text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              数据看板
            </button>
            <button
              onClick={() => setCurrentPage('parser')}
              className={`rounded-lg px-4 py-2 font-medium transition-all ${
                currentPage === 'parser'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              1688 解析
            </button>
          </div>
        </div>
      </nav>

      <main className="px-4 pb-8 pt-28">
        {currentPage === 'dashboard' ? <Dashboard /> : <Parser1688Page />}
      </main>
    </div>
  );
}

export default App;
