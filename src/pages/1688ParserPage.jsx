import React, { useState } from 'react';
import {
  FaSearch,
  FaCopy,
  FaDownload,
  FaMagic,
  FaLink,
  FaImage,
  FaTag,
  FaDollarSign,
  FaBox,
  FaShippingFast,
  FaChartLine,
  FaRobot,
  FaSync,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';

const ProductInfoCard = ({ title, value, icon, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
    pink: 'from-pink-500 to-rose-500'
  };

  return (
    <div className="glass-card p-4 hover:scale-[1.02] transition-transform">
      <div className="flex items-center space-x-3 mb-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colors[color]}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-400">{title}</h4>
          <p className="text-lg font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const ExtractionStep = ({ step, title, description, status = 'pending', data }) => {
  const statusConfig = {
    pending: { color: 'text-gray-400', bg: 'bg-gray-800', icon: <FaInfoCircle /> },
    processing: { color: 'text-blue-400', bg: 'bg-blue-900/30', icon: <FaSync className="animate-spin" /> },
    success: { color: 'text-green-400', bg: 'bg-green-900/30', icon: <FaCheckCircle /> },
    warning: { color: 'text-yellow-400', bg: 'bg-yellow-900/30', icon: <FaExclamationTriangle /> },
    error: { color: 'text-red-400', bg: 'bg-red-900/30', icon: <FaExclamationTriangle /> }
  };

  const config = statusConfig[status];

  return (
    <div className={`p-4 rounded-xl border ${config.bg} border-white/10 mb-3`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.bg}`}>
            <span className="font-bold text-white">{step}</span>
          </div>
          <h3 className={`font-semibold ${config.color}`}>{title}</h3>
        </div>
        <div className={config.color}>
          {config.icon}
        </div>
      </div>
      <p className="text-sm text-gray-300 mb-3">{description}</p>
      
      {data && (
        <div className="mt-2 p-3 bg-black/30 rounded-lg">
          <div className="text-xs text-gray-400 mb-1">提取结果:</div>
          <div className="text-sm text-white font-mono">{data}</div>
        </div>
      )}
    </div>
  );
};

const FieldMappingCard = ({ source, target, mapped = true }) => {
  return (
    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm text-gray-400">1688字段</div>
          <div className="text-white font-medium">{source}</div>
        </div>
        
        <div className="mx-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            mapped ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'
          }`}>
            {mapped ? '→' : '?'}
          </div>
        </div>
        
        <div className="flex-1 text-right">
          <div className="text-sm text-gray-400">TikTok字段</div>
          <div className="text-white font-medium">{target}</div>
        </div>
      </div>
      
      {!mapped && (
        <button className="mt-2 w-full text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30">
          手动映射
        </button>
      )}
    </div>
  );
};

const 1688ParserPage = () => {
  const [url, setUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [productData, setProductData] = useState(null);

  const exampleUrls = [
    'https://detail.1688.com/offer/1234567890.html',
    'https://detail.1688.com/offer/9876543210.html',
    'https://detail.1688.com/offer/5555555555.html'
  ];

  const mockProductData = {
    basicInfo: {
      title: '2024新款潮流印花短袖T恤 男女同款纯棉夏季休闲上衣',
      price: '¥45.80',
      moq: '50件',
      stock: '5000件',
      category: '服装 > T恤 > 短袖T恤'
    },
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg'
    ],
    specifications: [
      { name: '材质', value: '100%纯棉' },
      { name: '尺码', value: 'S M L XL XXL' },
      { name: '颜色', value: '白色/黑色/灰色/蓝色' },
      { name: '重量', value: '约200g' },
      { name: '包装', value: 'OPP袋装' }
    ],
    description: '2024夏季新款潮流印花短袖T恤，采用100%纯棉面料，亲肤透气，多色可选，支持定制LOGO，适合男女同款穿搭。',
    sellerInfo: {
      name: '广州潮流服饰有限公司',
      rating: '4.8/5.0',
      responseRate: '98%',
      deliveryTime: '24小时发货'
    }
  };

  const extractionSteps = [
    {
      step: 1,
      title: 'URL解析',
      description: '解析1688商品链接，获取页面信息',
      status: 'success',
      data: 'https://detail.1688.com/offer/1234567890.html'
    },
    {
      step: 2,
      title: '页面抓取',
      description: '下载商品页面HTML内容',
      status: 'success',
      data: 'HTML内容已获取 (18.5KB)'
    },
    {
      step: 3,
      title: '数据提取',
      description: '提取商品标题、价格、图片等信息',
      status: 'processing',
      data: '已提取: 标题、价格、主图...'
    },
    {
      step: 4,
      title: '规格解析',
      description: '解析商品规格参数表',
      status: 'pending'
    },
    {
      step: 5,
      title: '图片处理',
      description: '下载并优化商品图片',
      status: 'pending'
    },
    {
      step: 6,
      title: 'TikTok映射',
      description: '映射到TikTok店铺字段',
      status: 'pending'
    }
  ];

  const fieldMappings = [
    { source: '商品标题', target: '商品名称', mapped: true },
    { source: '商品价格', target: '销售价格', mapped: true },
    { source: '商品主图', target: '主图', mapped: true },
    { source: '商品详情图', target: '详情图', mapped: true },
    { source: '商品规格', target: 'SKU规格', mapped: true },
    { source: '起订量', target: '最小起订量', mapped: true },
    { source: '发货地', target: '发货地址', mapped: true },
    { source: '物流方式', target: '配送方式', mapped: false },
    { source: '售后服务', target: '售后政策', mapped: false }
  ];

  const handleExtract = () => {
    if (!url) return;
    
    setIsExtracting(true);
    setExtractionProgress(0);
    setProductData(null);

    // 模拟提取过程
    const interval = setInterval(() => {
      setExtractionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExtracting(false);
          setProductData(mockProductData);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleAutoFillTikTok = () => {
    alert('🎉 自动填充TikTok上架表单功能开发中...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
              <FaRobot className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">1688商品解析助手</h1>
              <p className="text-gray-400">一键解析1688商品，自动填充TikTok上架表单</p>
            </div>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：URL输入和提取控制 */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <FaLink className="text-2xl text-blue-400" />
                <h2 className="text-xl font-bold">1688商品链接解析</h2>
              </div>

              {/* URL输入 */}
              <div className="mb-6">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="粘贴1688商品链接，例如：https://detail.1688.com/offer/1234567890.html"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleExtract}
                    disabled={isExtracting || !url}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <FaSearch />
                    <span>{isExtracting ? '解析中...' : '开始解析'}</span>
                  </button>
                </div>

                {/* 示例链接 */}
                <div className="mt-4">
                  <p className="text-sm text-gray-400 mb-2">示例链接：</p>
                  <div className="flex flex-wrap gap-2">
                    {exampleUrls.map((exampleUrl, index) => (
                      <button
                        key={index}
                        onClick={() => setUrl(exampleUrl)}
                        className="text-xs px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 text-gray-300"
                      >
                        {exampleUrl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 提取进度 */}
              {isExtracting && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">提取进度</span>
                    <span className="text-sm font-semibold">{extractionProgress}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                      style={{ width: `${extractionProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* 提取步骤 */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg mb-3">提取步骤</h3>
                {extractionSteps.map((step) => (
                  <ExtractionStep key={step.step} {...step} />
                ))}
              </div>
            </div>

            {/* 商品信息展示 */}
            {productData && (
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <FaBox className="text-2xl text-green-400" />
                    <h2 className="text-xl font-bold">解析结果</h2>
                  </div>
                  <button
                    onClick={handleAutoFillTikTok}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:opacity-90 flex items-center space-x-2"
                  >
                    <FaMagic />
                    <span>一键填充TikTok</span>
                  </button>
                </div>

                {/* 基本信息卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <ProductInfoCard
                    title="商品标题"
                    value={productData.basicInfo.title}
                    icon={<FaTag />}
                    color="blue"
                  />
                  <ProductInfoCard
                    title="商品价格"
                    value={productData.basicInfo.price}
                    icon={<FaDollarSign />}
                    color="green"
                  />
                  <ProductInfoCard
                    title="起订量"
                    value={productData.basicInfo.moq}
                    icon={<FaBox />}
                    color="purple"
                  />
                  <ProductInfoCard
                    title="库存"
                    value={productData.basicInfo.stock}
                    icon={<FaShippingFast />}
                    color="orange"
                  />
                </div>

                {/* 规格参数 */}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-3">规格参数</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {productData.specifications.map((spec, index) => (
                      <div key={index} className="p-3 bg-white/5 rounded-lg">
                        <div className="text-sm text-gray-400">{spec.name}</div>
                        <div className="text-white font-medium">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 字段映射 */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">TikTok字段映射</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {fieldMappings.map((mapping, index) => (
                      <FieldMappingCard key={index} {...mapping} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：操作面板 */}
          <div>
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <FaMagic className="text-2xl text-purple-400" />
                <h2 className="text-xl font-bold">快捷操作</h2>
              </div>

              <div className="space-y-3">
                <button className="w-full p-4 bg-gradient-to-r from-blue-500/20 to-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center space-x-3">
                  <FaCopy />
                  <span>复制商品信息</span>
                </button>

                <button className="w-full p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/30 transition-colors flex items-center space-x-3">
                  <FaDownload />
                  <span>下载商品图片</span>
                </button>

                <button className="w-full p-4 bg-gradient-to-r from-purple-500/20 to-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center space-x-3">
                  <FaChartLine />
                  <span>价格趋势分析</span>
                </button>

                <button className="w-full p-4 bg-gradient-to-r from-orange-500/20 to-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors flex items-center space-x-3">
                  <FaRobot />
                  <span>AI优化建议</span>
                </button>
              </div>
            </div>

            {/* 使用提示 */}
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaInfoCircle className="text-xl text-cyan-400" />
                <h3 className="font-semibold">使用提示</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-cyan-400 mb-1">💡 最佳实践</div>
                  <p>优先选择有"实力商家"标识的商品，质量更有保障</p>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-green-400 mb-1">✅ 自动映射</div>
                  <p>系统会自动将1688字段映射到TikTok对应字段</p>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-yellow-400 mb-1">⚠️ 注意事项</div>
                  <p>解析后请仔细核对价格、规格等信息</p>
                </div>
                
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="font-medium text-purple-400 mb-1">🚀 效率提升</div>
                  <p>使用本工具可节省80%的上架时间</p>
                </div>
              </div>
            </div>

            {/* 统计数据 */}
            <div className="glass-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <FaChartLine className="text-xl text-pink-400" />
                <h3 className="font-semibold">解析统计</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">今日解析</span>
                    <span className="text-white font-semibold">12次</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">成功率</span>
                    <span className="text-white font-semibold">94.7%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '94.7%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">平均耗时</span>
                    <span className="text-white font-semibold">8.3秒</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">节省时间</span>
                    <span className="text-white font-semibold">6.5小时</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="mt-8 glass-card p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="font-semibold text-lg mb-2">批量操作</h3>
              <p className="text-sm text-gray-400">支持批量解析和上架</p>
            </div>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 flex items-center space-x-2">
                <FaSync />
                <span>批量解析</span>
              </button>
              
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 flex items-center space-x-2">
                <FaRobot />
                <span>AI批量优化</span>
              </button>
              
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:opacity-90 flex items-center space-x-2">
                <FaMagic />
                <span>一键上架</span>
              </button>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>1688解析助手 v1.0 • 数据安全加密 • 解析结果仅供参考，请以实际商品页面为准</p>
          <p className="mt-1">技术支持：钱钱 🦞 • 最后更新：2024-04-10</p>
        </div>
      </div>
    </div>
  );
};

export default 1688ParserPage;