import React from 'react';
import {
  FaChartBar,
  FaCogs,
  FaLightbulb,
  FaMagic,
  FaQuestionCircle,
  FaRobot,
  FaRocket,
  FaSync
} from 'react-icons/fa';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      icon: <FaRocket className="text-xl" />,
      title: '一键优化',
      description: '自动优化商品标题与描述，提高点击率。',
      color: 'from-purple-500 to-pink-500',
      hot: true
    },
    {
      id: 2,
      icon: <FaSync className="text-xl" />,
      title: '数据同步',
      description: '同步平台的最新订单、库存和投放数据。',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      icon: <FaChartBar className="text-xl" />,
      title: '生成报告',
      description: '快速生成运营日报和关键指标总结。',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      icon: <FaMagic className="text-xl" />,
      title: '智能定价',
      description: '根据市场表现给出建议售价。',
      color: 'from-orange-500 to-red-500',
      isNew: true
    },
    {
      id: 5,
      icon: <FaRobot className="text-xl" />,
      title: 'AI 助手',
      description: '生成运营建议、话术和内容方向。',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      icon: <FaLightbulb className="text-xl" />,
      title: '竞品分析',
      description: '查看竞品近期表现与投放趋势。',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="glass-card relative h-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-secondary to-accent p-2">
            <FaCogs className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">快捷操作</h3>
            <p className="text-sm text-gray-400">一键执行常用运营任务</p>
          </div>
        </div>
        <button className="text-sm text-gray-400 hover:text-white">
          <FaQuestionCircle />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            className="group relative rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-white/30"
          >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${action.color} opacity-0 transition-opacity group-hover:opacity-10`} />

            {action.hot ? (
              <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 text-xs font-bold text-white">
                HOT
              </div>
            ) : null}
            {action.isNew ? (
              <div className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-1 text-xs font-bold text-white">
                NEW
              </div>
            ) : null}

            <div className="relative">
              <div className={`mb-3 w-fit rounded-lg bg-gradient-to-br p-2 ${action.color}`}>
                {action.icon}
              </div>
              <h4 className="mb-1 font-semibold text-white">{action.title}</h4>
              <p className="text-xs text-gray-400">{action.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/5 p-2">
            <FaLightbulb className="text-yellow-400" />
          </div>
          <p className="text-sm text-gray-300">
            <span className="font-medium text-white">提示:</span> 点击任意操作卡片即可执行对应任务，后续也可以把这里接到真实接口。
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-40 w-40 -translate-x-20 translate-y-20 rounded-full bg-gradient-to-tr from-accent/10 to-secondary/10 blur-3xl" />
    </div>
  );
};

export default QuickActions;
