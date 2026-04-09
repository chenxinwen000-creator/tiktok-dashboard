import React from 'react';
import {
  FaRocket,
  FaSync,
  FaChartBar,
  FaMagic,
  FaRobot,
  FaLightbulb,
  FaCogs,
  FaQuestionCircle
} from 'react-icons/fa';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      icon: <FaRocket className="text-xl" />,
      title: '一键优化',
      description: '自动优化商品标题和描述',
      color: 'from-purple-500 to-pink-500',
      hot: true
    },
    {
      id: 2,
      icon: <FaSync className="text-xl" />,
      title: '数据同步',
      description: '同步所有平台最新数据',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      icon: <FaChartBar className="text-xl" />,
      title: '生成报告',
      description: '创建运营数据分析报告',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      icon: <FaMagic className="text-xl" />,
      title: '智能定价',
      description: '基于市场数据自动定价',
      color: 'from-orange-500 to-red-500',
      new: true
    },
    {
      id: 5,
      icon: <FaRobot className="text-xl" />,
      title: 'AI助手',
      description: '获取运营建议和策略',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      icon: <FaLightbulb className="text-xl" />,
      title: '竞品分析',
      description: '分析竞争对手数据',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-accent">
            <FaCogs className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">快速操作</h2>
            <p className="text-sm text-gray-400">一键完成常用任务</p>
          </div>
        </div>
        <button className="text-sm text-gray-400 hover:text-white">
          <FaQuestionCircle />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map(action => (
          <button
            key={action.id}
            className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-left"
          >
            {/* 背景装饰 */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>
            
            {/* 角标 */}
            {action.hot && (
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold rounded-full">
                热
              </div>
            )}
            {action.new && (
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-bold rounded-full">
                新
              </div>
            )}
            
            <div className="relative">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} w-fit mb-3`}>
                {action.icon}
              </div>
              
              <h3 className="font-semibold text-white mb-1">{action.title}</h3>
              <p className="text-xs text-gray-400">{action.description}</p>
              
              {/* 悬停箭头 */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-2 h-2 border-r-2 border-t-2 border-white transform rotate-45"></div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 使用提示 */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-white/5">
            <FaLightbulb className="text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-300">
              <span className="text-white font-medium">提示：</span>
              点击操作按钮可快速执行任务，系统会自动处理相关流程
            </p>
          </div>
        </div>
      </div>

      {/* 装饰元素 */}
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/10 to-secondary/10 rounded-full -translate-x-20 translate-y-20 blur-3xl"></div>
    </div>
  );
};

export default QuickActions;
