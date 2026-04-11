import React from 'react';
import { FaBell, FaChartLine, FaExclamationTriangle, FaShoppingCart } from 'react-icons/fa';

const AlertPanel = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      icon: <FaExclamationTriangle className="text-yellow-400" />,
      title: '库存预警',
      message: '3 个商品库存低于安全线，请尽快补货。',
      time: '2 小时前',
      items: ['潮流印花短袖 T 恤', '运动瑜伽套装', '设计感卫衣']
    },
    {
      id: 2,
      type: 'error',
      icon: <FaChartLine className="text-red-400" />,
      title: '流量下降',
      message: '今日访客数较昨日下降 15%，建议检查投流计划。',
      time: '4 小时前',
      action: '查看详情'
    },
    {
      id: 3,
      type: 'info',
      icon: <FaShoppingCart className="text-blue-400" />,
      title: '新订单待处理',
      message: '当前有 7 个新订单等待打包发货。',
      time: '1 小时前',
      action: '立即处理'
    },
    {
      id: 4,
      type: 'success',
      icon: <FaBell className="text-green-400" />,
      title: '活动提醒',
      message: '618 大促将在今晚开始，营销素材已准备完成。',
      time: '5 小时前',
      action: '查看活动'
    }
  ];

  const alertTypeStyles = {
    warning: 'border-yellow-500/30 bg-yellow-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    info: 'border-blue-500/30 bg-blue-500/10',
    success: 'border-green-500/30 bg-green-500/10'
  };

  return (
    <div className="glass-card relative h-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-500 p-2">
            <FaBell className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">实时预警</h3>
            <p className="text-sm text-gray-400">系统监控与异常提醒</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>4 条未读</span>
          <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`cursor-pointer rounded-xl border p-4 transition-all hover:scale-[1.02] ${alertTypeStyles[alert.type]}`}
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-white/5 p-2">{alert.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white">{alert.title}</h4>
                    <p className="mt-1 text-sm text-gray-300">{alert.message}</p>
                    {alert.items ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {alert.items.map((item) => (
                          <span key={item} className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-gray-400">{alert.time}</div>
                    {alert.action ? (
                      <button className="mt-2 rounded-lg bg-white/10 px-3 py-1 text-xs text-white transition-colors hover:bg-white/20">
                        {alert.action}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-gray-400">今日预警</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">3</div>
            <div className="text-xs text-gray-400">库存预警</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-xs text-gray-400">紧急异常</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">8</div>
            <div className="text-xs text-gray-400">已处理</div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-3xl" />
    </div>
  );
};

export default AlertPanel;
