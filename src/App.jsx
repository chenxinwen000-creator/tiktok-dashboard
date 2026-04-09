import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载数据
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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
          <h2 className="text-2xl font-bold text-white mt-6 mb-2">加载 TikTok 数据中...</h2>
          <p className="text-gray-400">正在连接你的店铺数据</p>
          <div className="mt-4 w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-secondary to-accent animate-progress"></div>
          </div>
          <style>{`
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            .animate-progress {
              animation: progress 1.5s ease-in-out;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
