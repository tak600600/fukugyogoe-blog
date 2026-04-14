/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // ===== セキュリティヘッダー =====
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // クリックジャッキング防止
          { key: 'X-Frame-Options', value: 'DENY' },
          // XSS フィルター
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // リファラー制御
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // HTTPS 強制（Vercel は自動 HTTPS だが念のため）
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // 権限ポリシー（カメラ・マイク等の不要な API を無効化）
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Content Security Policy（XSS 対策）
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // Next.js に必要
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
