import React from 'react';

const DataChart = ({ type = 'sales' }) => {
  const data = {
    sales: [
      { time: '00:00', value: 1200 },
      { time: '04:00', value: 1800 },
      { time: '08:00', value: 3200 },
      { time: '12:00', value: 5800 },
      { time: '16:00', value: 4200 },
      { time: '20:00', value: 8900 },
      { time: '23:59', value: 4500 }
    ],
    visitors: [
      { time: '00:00', value: 800 },
      { time: '04:00', value: 1200 },
      { time: '08:00', value: 2800 },
      { time: '12:00', value: 5200 },
      { time: '16:00', value: 3800 },
      { time: '20:00', value: 7200 },
      { time: '23:59', value: 3200 }
    ],
    engagement: [
      { time: '00:00', value: 2.1 },
      { time: '04:00', value: 1.8 },
      { time: '08:00', value: 3.2 },
      { time: '12:00', value: 4.8 },
      { time: '16:00', value: 3.5 },
      { time: '20:00', value: 5.2 },
      { time: '23:59', value: 3.8 }
    ]
  };

  const chartData = data[type] || data.sales;
  const maxValue = Math.max(...chartData.map(d => d.value));
  const colors = {
    sales: 'from-secondary to-accent',
    visitors: 'from-blue-500 to-cyan-500',
    engagement: 'from-purple-500 to-pink-500'
  };

  return (
    <div className="relative">
      {/* 图表 */}
      <div className="h-64 flex items-end space-x-2">
        {chartData.map((point, index) => {
          const height = (point.value / maxValue) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div
                className={`w-full rounded-t-lg bg-gradient-to-t ${colors[type]} transition-all duration-300 group-hover:opacity-80 relative`}
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {point.time}: {type === 'engagement' ? `${point.value}%` : point.value.toLocaleString()}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{point.time}</div>
            </div>
          );
        })}
      </div>
      
      {/* 图例 */}
      <div className="flex items-center justify-center space-x-6 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-accent"></div>
          <span className="text-sm text-gray-400">实时数据</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-700"></div>
          <span className="text-sm text-gray-400">昨日同期</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          <span className="text-sm text-gray-400">上周同期</span>
        </div>
      </div>
      
      {/* 装饰线条 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default DataChart;
