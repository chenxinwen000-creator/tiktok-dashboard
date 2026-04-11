import React from 'react';
import { FaEye, FaFire, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ rank }) => {
  const products = [
    {
      name: '潮流印花短袖 T 恤',
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
      name: '运动瑜伽套装',
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
  const stockRatio = Math.min(100, product.stock);

  return (
    <div className="group relative">
      <div className="glass-card p-4 transition-all hover:border-secondary/50">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${rankColors[rank - 1]}`}>
            <span className="text-lg font-bold text-white">#{rank}</span>
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-white transition-colors group-hover:text-secondary">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded bg-white/10 px-2 py-1 text-xs">{product.category}</span>
                  {rank === 1 ? (
                    <span className="flex items-center rounded bg-red-500/20 px-2 py-1 text-xs text-red-400">
                      <FaFire className="mr-1" /> 爆款
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-white">¥{product.revenue.toLocaleString()}</div>
                <div className="text-xs text-gray-400">销售额</div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <FaShoppingCart className="text-green-400" />
                  <span className="font-semibold text-white">{product.sales}</span>
                </div>
                <div className="mt-1 text-xs text-gray-400">销量</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold text-white">{product.rating}</span>
                </div>
                <div className="mt-1 text-xs text-gray-400">评分</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <FaEye className="text-blue-400" />
                  <span className="font-semibold text-white">{(product.views / 1000).toFixed(1)}k</span>
                </div>
                <div className="mt-1 text-xs text-gray-400">浏览</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-white">{product.stock}</div>
                <div className="mt-1 text-xs text-gray-400">库存</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-400">
                <span>库存状态</span>
                <span>{stockRatio}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${stockRatio}%`,
                    background:
                      product.stock < 20
                        ? 'linear-gradient(90deg, #FF3B30, #FF9500)'
                        : 'linear-gradient(90deg, #25D366, #34C759)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent transition-colors group-hover:border-secondary/30" />
      </div>
    </div>
  );
};

export default ProductCard;
