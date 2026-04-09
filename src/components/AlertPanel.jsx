import React from 'react';
import { 
  FaExclamationTriangle, 
  FaBell, 
  FaShoppingCart, 
  FaChartLine,
  FaBox,
  FaTag
} from 'react-icons/fa';

const AlertPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      icon: <FaExclamationTriangle className="text-yellow-400" />,
      title: '库存预警',
      message: '3款商品库存低于安全线',
      time: '2小时前',
      items: ['潮流印花T恤', '运动瑜伽裤', '设计感卫衣']
    },
    {
      id: 2,
      type: 'error',
      icon: <FaChartLine className="text-red-400" />,
      title: '流量下降',
      message: '今日访客数较昨日下降15%',
      time: '4小时前',
      action: '查看详情'
    },
    {
      id: 3,
      type: 'info',
      icon: <FaShoppingCart className="text-blue-400" />,
      title: '新订单',
      message: '有8个新订单等待处理',
      time: '1小时前',
      action: '立即处理'
    },
    {
      id: 4,
      type: 'success',
      icon: <FaBell className="text-green-400" />,
      title: '活动提醒',
      message: '618大促活动即将开始',
      time: '5小时前',
      action: '准备活动'
    }
  ];

  const alertTypeStyles = {
    warning: 'border-yellow-500/30 bg-yellow-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    info: 'border-blue-500/30 bg-blue-500/10',
    success: 'border-green-500/30 bg-green-500/10'
  };

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
            <FaBell className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">实时预警</h2>
            <p className="text-sm text-gray-400">系统监控与提醒</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">4条未读</span>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-xl border ${alertTypeStyles[alert.type]} transition-all hover:scale-[1.02] cursor-pointer`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-white/5">
                {alert.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{alert.title}</h3>
                    <p className="text-sm text-gray-300 mt-1">{alert.message}</p>
                    
                    {alert.items && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {alert.items.map((item, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-400">{alert.time}</div>
                    {alert.action && (
                      <button className="mt-2 text-xs px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                        {alert.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 预警统计 */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-gray-400">今日预警</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">3</div>
            <div className="text-xs text-gray-400">库存预警</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-xs text-gray-400">紧急预警</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">8</div>
            <div className="text-xs text-gray-400">已处理</div>
          </div>
        </div>
      </div>

      {/* 装饰元素 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full -translate-y-16 translate-x-16 blur-3xl"></div>
    </div>
  );
};

export default AlertPanel;
