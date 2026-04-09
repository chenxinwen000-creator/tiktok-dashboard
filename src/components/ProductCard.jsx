import React from 'react';
import { FaFire, FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';

const ProductCard = ({ rank }) => {
  const products = [
    {
      name: '潮流印花T恤',
      category: '服装',
      sales: 1248,
      revenue: 62400,
      stock: 42,
      rating: 4.8,
      views: 24800
    },
    {
      name: '无线蓝牙耳机',
      category: '电子产品',
      sales: 892,
      revenue: 178400,
      stock: 15,
      rating: 4.9,
      views: 35600
    },
    {
      name: '运动瑜伽裤',
      category: '运动服饰',
      sales: 756,
      revenue: 45360,
      stock: 28,
      rating: 4.7,
      views: 19200
    }
  ];

  const product = products[rank - 1] || products[0];
  const rankColors = [
    'from-yellow-500 to-orange-500',
    'from-gray-400 to-gray-600',
    'from-amber-700 to-amber-900'
  ];

  return (
    <div className="group relative">
      <div className="glass-card p-4 hover:border-secondary/50 transition-all">
        <div className="flex items-start space-x-3">
          {/* 排名徽章 */}
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${rankColors[rank - 1]} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-bold text-lg">#{rank}</span>
          </div>
          
          {/* 商品信息 */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white group-hover:text-secondary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded">{product.category}</span>
                  {rank === 1 && (
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded flex items-center">
                      <FaFire className="mr-1" /> 爆款
                    </span>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-white">¥{(product.revenue / 100).toLocaleString()}</div>
                <div className="text-xs text-gray-400">销售额</div>
              </div>
            </div>
            
            {/* 数据指标 */}
            <div className="grid grid-cols-4 gap-2 mt-3">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <FaShoppingCart className="text-green-400" />
                  <span className="font-semibold text-white">{product.sales}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">销量</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold text-white">{product.rating}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">评分</div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-sm">
                  <FaEye className="text-blue-400" />
                  <span className="font-semibold text-white">{(product.views / 1000).toFixed(1)}k</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">浏览</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-semibold text-white">{product.stock}</div>
                <div className="text-xs text-gray-400 mt-1">库存</div>
              </div>
            </div>
            
            {/* 库存进度条 */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>库存状态</span>
                <span>{Math.round((product.stock / 100) * 100)}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${Math.round((product.stock / 100) * 100)}%`,
                    background: product.stock < 20 
                      ? 'linear-gradient(90deg, #FF3B30, #FF9500)'
                      : 'linear-gradient(90deg, #25D366, #34C759)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 悬停效果 */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-secondary/30 transition-colors pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ProductCard;
