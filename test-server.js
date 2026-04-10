// 简单测试ES模块
import express from 'express';
const app = express();
const PORT = 3002;

app.get('/test', (req, res) => {
  res.json({ message: 'ES模块测试成功!', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ ES模块服务器测试成功: http://localhost:${PORT}/test`);
});