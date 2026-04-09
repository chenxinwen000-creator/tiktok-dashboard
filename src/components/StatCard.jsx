import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatCard = ({ title, value, change, icon, color, trend }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="data-card group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <div className="text-white text-xl">{icon}</div>
        </div>
        
        <div className="text-right">
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
            isPositive 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {isPositive ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
            {isPositive ? '+' : ''}{change}%
          </div>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-accent transition-all">
          {value}
        </div>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
      
      {/* 迷你进度条 */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>目标进度</span>
          <span>{Math.min(100, Math.abs(change) + 70)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${Math.min(100, Math.abs(change) + 70)}%` }}
          ></div>
        </div>
      </div>
      
      {/* 悬停效果装饰 */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-colors pointer-events-none"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-secondary/0 via-secondary/5 to-accent/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default StatCard;
