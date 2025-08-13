# BECmaster

面向中文用户学习 BEC 中级/高级英语的 Web 应用。基于 Next.js + Supabase，提供词书、SRS、小游戏、诊断测试等功能。

## 本地运行

```bash
npm install
npm run dev
```

访问 <http://localhost:3000>。

## 连接 Supabase

1. 在 [Supabase](https://supabase.com) 新建项目。
2. 获取项目的 `URL` 和 `anon key`，写入 `.env.local`：

```
NEXT_PUBLIC_SUPABASE_URL=你的URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon key
NEXT_PUBLIC_ENABLE_AI=false
OPENAI_API_KEY=
```

## 初始化数据库

在 Supabase 控制台 SQL Editor 执行 [`supabase/sql/init.sql`](./supabase/sql/init.sql)。

## 导入示例词表

将 [`data/words.sample.csv`](./data/words.sample.csv) 导入 `words` 表，可通过：

1. Supabase GUI 导入 CSV。
2. 在 SQL Editor 使用 `copy` 语句。
3. 使用 Supabase REST API 上传。

## 部署到 Vercel

1. 将代码推送到 GitHub。
2. 在 Vercel 选择该仓库部署，配置环境变量与 `.env.example` 一致。
3. 首次部署完成后绑定自定义域名。

## 假设与后续优化

- 当前未实现完整的认证与真实数据库交互，页面使用示例数据。
- 小游戏与诊断测试为最小可运行原型，未来需补充题库与统计。
- 统计面板、学习路径等逻辑简化，需与后台数据打通。
