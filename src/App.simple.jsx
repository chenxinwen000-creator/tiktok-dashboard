import React, { useState, useEffect } from 'react';
import './styles/simple.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0c29, #302b63)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <div style={{
              width: '96px',
              height: '96px',
              border: '4px solid transparent',
              borderTopColor: '#FF0050',
              borderRightColor: '#00F2EA',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: '0.5rem 0' }}>
            加载 TikTok 数据中...
          </h2>
          <p style={{ color: '#9ca3af' }}>正在连接你的店铺数据</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        🛍️ TikTok电商数据助手
      </h1>
      <p style={{ color: '#d1d5db', marginBottom: '2rem' }}>
        简化版 - 正在修复TailwindCSS依赖
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {['销售额', '订单数', '访客数', '转化率'].map((title, idx) => (
          <div key={idx} className="data-card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {idx === 0 ? '¥45,892' : idx === 1 ? '1,248' : idx === 2 ? '8,942' : '3.2%'}
            </h3>
            <p style={{ color: '#9ca3af' }}>{title}</p>
            <div style={{ marginTop: '1rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <div style={{ 
                height: '100%', 
                width: `${70 + idx * 10}%`,
                background: 'linear-gradient(90deg, #FF0050, #00F2EA)',
                borderRadius: '2px'
              }}></div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="gradient-btn" style={{ marginTop: '2rem' }}>
        刷新数据
      </button>
    </div>
  );
}

export default App;
