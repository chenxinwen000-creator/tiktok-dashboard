import React, { useMemo, useState } from 'react';
import {
  FaBox,
  FaChartLine,
  FaCheckCircle,
  FaCopy,
  FaDollarSign,
  FaDownload,
  FaExclamationTriangle,
  FaInfoCircle,
  FaLink,
  FaMagic,
  FaRobot,
  FaSearch,
  FaShippingFast,
  FaSync,
  FaTag
} from 'react-icons/fa';

const ProductInfoCard = ({ title, value, icon, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500'
  };

  return (
    <div className="glass-card p-4 transition-transform hover:scale-[1.02]">
      <div className="mb-3 flex items-center gap-3">
        <div className={`rounded-lg bg-gradient-to-br p-2 ${colors[color]}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm text-gray-400">{title}</h4>
          <p className="truncate text-lg font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const ExtractionStep = ({ step, title, description, status, data }) => {
  const config = {
    pending: { icon: <FaInfoCircle />, color: 'text-gray-400', bg: 'bg-white/5' },
    processing: { icon: <FaSync className="animate-spin" />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    success: { icon: <FaCheckCircle />, color: 'text-green-400', bg: 'bg-green-500/10' },
    error: { icon: <FaExclamationTriangle />, color: 'text-red-400', bg: 'bg-red-500/10' }
  }[status];

  return (
    <div className={`rounded-xl border border-white/10 p-4 ${config.bg}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-sm font-bold text-white">
            {step}
          </div>
          <h3 className={`font-semibold ${config.color}`}>{title}</h3>
        </div>
        <div className={config.color}>{config.icon}</div>
      </div>
      <p className="text-sm text-gray-300">{description}</p>
      {data ? (
        <div className="mt-3 rounded-lg bg-black/30 p-3 text-sm font-mono text-white">
          {data}
        </div>
      ) : null}
    </div>
  );
};

const FieldMappingCard = ({ source, target, mapped }) => (
  <div className="rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10">
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <div className="text-sm text-gray-400">1688 字段</div>
        <div className="font-medium text-white">{source}</div>
      </div>
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          mapped ? 'bg-green-500/20 text-green-400' : 'bg-gray-800 text-gray-400'
        }`}
      >
        {mapped ? '→' : '?'}
      </div>
      <div className="flex-1 text-right">
        <div className="text-sm text-gray-400">TikTok 字段</div>
        <div className="font-medium text-white">{target}</div>
      </div>
    </div>
  </div>
);

const mockProductData = {
  basicInfo: {
    title: '2024 新款潮流印花短袖 T 恤 男女同款纯棉夏季休闲上衣',
    price: '¥45.80',
    moq: '50 件',
    stock: '5000 件',
    category: '服装 > T 恤 > 短袖'
  },
  specifications: [
    { name: '材质', value: '100% 纯棉' },
    { name: '尺码', value: 'S / M / L / XL / XXL' },
    { name: '颜色', value: '白 / 黑 / 灰 / 蓝' },
    { name: '重量', value: '约 200g' },
    { name: '包装', value: 'OPP 袋装' }
  ]
};

const exampleUrls = [
  'https://detail.1688.com/offer/1234567890.html',
  'https://detail.1688.com/offer/9876543210.html',
  'https://detail.1688.com/offer/5555555555.html'
];

const fieldMappings = [
  { source: '商品标题', target: '商品名称', mapped: true },
  { source: '商品价格', target: '销售价格', mapped: true },
  { source: '商品主图', target: '主图', mapped: true },
  { source: '商品详情图', target: '详情图', mapped: true },
  { source: '商品规格', target: 'SKU 规格', mapped: true },
  { source: '起订量', target: '最小起订量', mapped: true },
  { source: '发货地', target: '发货地址', mapped: true },
  { source: '物流方式', target: '配送方式', mapped: false },
  { source: '售后服务', target: '售后政策', mapped: false }
];

const Parser1688Page = () => {
  const [url, setUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [productData, setProductData] = useState(null);

  const extractionSteps = useMemo(() => {
    if (!isExtracting && !productData) {
      return [
        { step: 1, title: '输入商品链接', description: '粘贴一个有效的 1688 商品详情页链接。', status: 'pending' },
        { step: 2, title: '抓取页面内容', description: '系统会提取标题、价格、图片与规格信息。', status: 'pending' },
        { step: 3, title: '映射 TikTok 字段', description: '自动生成适合 TikTok 上架的结构化数据。', status: 'pending' }
      ];
    }

    return [
      {
        step: 1,
        title: 'URL 解析',
        description: '校验商品链接并提取商品 ID。',
        status: extractionProgress >= 20 ? 'success' : 'processing',
        data: url
      },
      {
        step: 2,
        title: '页面抓取',
        description: '加载商品详情页并收集基础数据。',
        status: extractionProgress >= 60 ? 'success' : 'processing',
        data: extractionProgress >= 30 ? '已抓取 HTML 内容与核心字段' : ''
      },
      {
        step: 3,
        title: '字段整理',
        description: '将标题、价格、规格映射为 TikTok 上架结构。',
        status: extractionProgress >= 100 ? 'success' : 'processing',
        data: extractionProgress >= 80 ? '已生成标题、价格、规格与库存映射' : ''
      }
    ];
  }, [extractionProgress, isExtracting, productData, url]);

  const handleExtract = () => {
    if (!url.trim()) return;

    setIsExtracting(true);
    setExtractionProgress(0);
    setProductData(null);

    const interval = setInterval(() => {
      setExtractionProgress((prev) => {
        const next = prev + 20;
        if (next >= 100) {
          clearInterval(interval);
          setIsExtracting(false);
          setProductData(mockProductData);
          return 100;
        }
        return next;
      });
    }, 250);
  };

  return (
    <div className="mx-auto max-w-7xl text-white">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-3">
            <FaRobot className="text-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">1688 商品解析助手</h2>
            <p className="text-gray-400">一键提取商品信息，生成适合 TikTok 上架的结构化数据</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="glass-card mb-6 p-6">
            <div className="mb-6 flex items-center gap-3">
              <FaLink className="text-2xl text-blue-400" />
              <h3 className="text-xl font-bold">1688 链接解析</h3>
            </div>

            <div className="mb-6">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="粘贴 1688 商品链接，例如 https://detail.1688.com/offer/1234567890.html"
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={handleExtract}
                  disabled={isExtracting || !url.trim()}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSearch />
                  <span>{isExtracting ? '解析中...' : '开始解析'}</span>
                </button>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-sm text-gray-400">示例链接</p>
                <div className="flex flex-wrap gap-2">
                  {exampleUrls.map((exampleUrl) => (
                    <button
                      key={exampleUrl}
                      onClick={() => setUrl(exampleUrl)}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 hover:bg-white/10"
                    >
                      {exampleUrl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isExtracting ? (
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-gray-400">提取进度</span>
                  <span className="font-semibold text-white">{extractionProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                    style={{ width: `${extractionProgress}%` }}
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-3">
              <h4 className="text-lg font-semibold">解析步骤</h4>
              {extractionSteps.map((step) => (
                <ExtractionStep key={step.step} {...step} />
              ))}
            </div>
          </div>

          {productData ? (
            <div className="glass-card p-6">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <FaBox className="text-2xl text-green-400" />
                  <h3 className="text-xl font-bold">解析结果</h3>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 font-semibold text-white hover:opacity-90">
                  <FaMagic />
                  <span>一键填充 TikTok</span>
                </button>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ProductInfoCard title="商品标题" value={productData.basicInfo.title} icon={<FaTag />} color="blue" />
                <ProductInfoCard title="商品价格" value={productData.basicInfo.price} icon={<FaDollarSign />} color="green" />
                <ProductInfoCard title="起订量" value={productData.basicInfo.moq} icon={<FaBox />} color="purple" />
                <ProductInfoCard title="库存" value={productData.basicInfo.stock} icon={<FaShippingFast />} color="orange" />
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-lg font-semibold">规格参数</h4>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
                  {productData.specifications.map((spec) => (
                    <div key={spec.name} className="rounded-lg bg-white/5 p-3">
                      <div className="text-sm text-gray-400">{spec.name}</div>
                      <div className="font-medium text-white">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-lg font-semibold">字段映射</h4>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {fieldMappings.map((mapping) => (
                    <FieldMappingCard key={mapping.source} {...mapping} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="mb-6 flex items-center gap-3">
              <FaMagic className="text-2xl text-purple-400" />
              <h3 className="text-xl font-bold">快捷操作</h3>
            </div>

            <div className="space-y-3">
              <button className="flex w-full items-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-left text-blue-300 transition-colors hover:bg-blue-500/20">
                <FaCopy />
                <span>复制商品信息</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-left text-green-300 transition-colors hover:bg-green-500/20">
                <FaDownload />
                <span>下载商品图片</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 text-left text-purple-300 transition-colors hover:bg-purple-500/20">
                <FaChartLine />
                <span>分析价格趋势</span>
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg border border-orange-500/30 bg-orange-500/10 p-4 text-left text-orange-300 transition-colors hover:bg-orange-500/20">
                <FaRobot />
                <span>生成优化建议</span>
              </button>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaInfoCircle className="text-xl text-cyan-400" />
              <h3 className="font-semibold">使用提示</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="rounded-lg bg-white/5 p-3">
                <div className="mb-1 font-medium text-cyan-400">最佳实践</div>
                <p>优先选择信息完整、规格清晰的商品链接，提取效果会更稳定。</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <div className="mb-1 font-medium text-green-400">自动映射</div>
                <p>系统会自动将标题、价格、规格等字段映射到 TikTok 表单。</p>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <div className="mb-1 font-medium text-yellow-400">注意事项</div>
                <p>解析完成后仍建议人工复核价格、颜色和尺码等关键信息。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>1688 解析助手 v1.0 | 结果仅供演示，最终请以商品详情页为准</p>
      </div>
    </div>
  );
};

export default Parser1688Page;
