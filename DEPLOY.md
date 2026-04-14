# Vercel デプロイ手順

## 必要なもの
- GitHubアカウント（無料）
- Vercelアカウント（無料）— https://vercel.com でGitHubログイン

---

## Step 1: GitHubにアップロード

1. https://github.com/new でリポジトリを作成（例: `fukugyogoe-blog`）
2. このフォルダ全体をそのリポジトリにアップロード
   - GitHub Desktop を使うのが一番簡単です（https://desktop.github.com）

---

## Step 2: Vercelにデプロイ

1. https://vercel.com にアクセス → 「GitHubでログイン」
2. 「Add New Project」→ 先ほどのリポジトリを選択
3. **Framework Preset** が「Next.js」と自動検出されるのを確認
4. 「Deploy」ボタンを押す → 約2分でデプロイ完了
5. `https://fukugyogoe-blog.vercel.app` のようなURLでアクセスできます

---

## Step 3: 独自ドメイン（fukugyogoe.blog）の設定

Vercelダッシュボード → プロジェクト → Settings → Domains:
1. `fukugyogoe.blog` を追加
2. XSERVERのDNS設定で以下を変更：
   - Aレコード: `@` → `76.76.21.21`（VercelのIP）
   - CNAMEレコード: `www` → `cname.vercel-dns.com`
3. 数時間〜1日でSSL含めて反映されます

---

## 記事の書き方

`posts/` フォルダに `.mdx` ファイルを追加するだけです。

```markdown
---
title: "記事タイトル"
date: "2026-04-15"
category: "ai"    # ai / ikuji / fukugyo / money / shikaku
excerpt: "記事の要約文（TOPページに表示される）"
---

## 見出し

本文をMarkdownで書く。
```

ファイルを保存してGitHubにアップロードすると、Vercelが自動でビルドして公開します。

---

## 数値の更新方法

`lib/siteConfig.js` を編集するだけで全ページの数値が一括更新されます：

```js
assetTracker: {
  current: 2000,   // ← ここを変える（万円）
  target: 3000,
},
xFollowers: 182,   // ← ここを変える
```

---

## ローカルで確認する場合

```bash
cd fukugyogoe-blog
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く。
