import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { getAllPosts, daysUntil } from '@/lib/posts';
import Sidebar from '@/components/Sidebar';

const categoryMeta = {
  ai:      { label: 'AI活用',   emoji: '🤖', theme: 'ai-theme',      cls: 'ai'      },
  ikuji:   { label: '育児',     emoji: '👶', theme: 'ikuji-theme',   cls: 'ikuji'   },
  fukugyo: { label: '副業',     emoji: '💼', theme: 'fukugyo-theme', cls: 'fukugyo' },
  money:   { label: '資産形成', emoji: '📈', theme: 'money-theme',   cls: 'money'   },
  shikaku: { label: '資格勉強', emoji: '📚', theme: 'shikaku-theme', cls: 'shikaku' },
};

function getCatMeta(cat) {
  return categoryMeta[cat] || { label: cat, emoji: '📄', theme: 'ai-theme', cls: 'ai' };
}

function ArticleCard({ post }) {
  const m = getCatMeta(post.category);
  return (
    <Link href={`/posts/${post.slug}`} className="article-card">
      <div className={`card-thumb ${m.theme}`}>
        <span style={{ fontSize: 40 }}>{m.emoji}</span>
      </div>
      <div className="article-body">
        <div className="card-tags"><span className={`tag ${m.cls}`}>{m.label}</span></div>
        <div className="article-title">{post.title}</div>
        <div className="article-meta">
          <span>{post.date}</span>
          <span className={`tag ${m.cls}`}>{m.label}</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const allPosts = getAllPosts();
  const featured = allPosts.slice(0, 3);
  const days = daysUntil(siteConfig.examDate);
  const { current, target } = siteConfig.assetTracker;

  const sections = ['ai', 'ikuji', 'fukugyo', 'shikaku'];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">✍️ 30〜40代会社員パパの実録ブログ</div>
            <h1 className="hero-title">
              <span className="accent">育児</span>・<span className="accent2">AI</span>・副業・<br />
              <span className="accent3">資格勉強</span>を全部<br />
              やる人の記録。
            </h1>
            <p className="hero-desc">
              2歳・0歳の子育て中。本業の合間にAIをフル活用して中小企業診断士2次試験に挑戦しながら副業・資産形成も継続中。資産3,000万円達成までの軌跡を全部公開します。
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-num">¥{current.toLocaleString()}万</span>
                <span className="stat-label">現在の資産残高</span>
              </div>
              <div className="stat">
                <span className="stat-num purple">{days}日</span>
                <span className="stat-label">診断士2次試験まで</span>
              </div>
              <div className="stat">
                <span className="stat-num">{siteConfig.xFollowers}人</span>
                <span className="stat-label">Xフォロワー</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-title">🏷 このブログのテーマ</div>
              <div className="theme-pill"><span className="theme-emoji">🤖</span> AI × 作業効率化</div>
              <div className="theme-pill"><span className="theme-emoji">👶</span> 育児 × 時短ライフ</div>
              <div className="theme-pill"><span className="theme-emoji">💼</span> 副業 × 収入源づくり</div>
              <div className="theme-pill"><span className="theme-emoji">📚</span> 診断士 × AI勉強法</div>
              <div className="theme-pill"><span className="theme-emoji">📈</span> 資産3,000万への記録</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN ===== */}
      <div className="main-layout">
        <main className="main-content">

          {/* 注目記事 */}
          {featured.length > 0 && (
            <>
              <div className="section-header">
                <h2 className="section-title">🔥 注目の記事</h2>
                <div className="section-line" />
              </div>
              <div className="featured-grid" style={{ gridTemplateColumns: featured.length === 1 ? '1fr' : undefined }}>
                {featured.map((post, i) => {
                  const m = getCatMeta(post.category);
                  return (
                    <Link key={post.slug} href={`/posts/${post.slug}`} className={`featured-card${i === 0 ? ' large' : ''}`}>
                      <div className={`card-thumb ${m.theme}`}>
                        <span className="thumb-emoji" style={{ fontSize: 64, opacity: 0.8 }}>{m.emoji}</span>
                        {i === 0 && <span className="thumb-label">✨ 人気No.1</span>}
                      </div>
                      <div className="card-body">
                        <div className="card-tags"><span className={`tag ${m.cls}`}>{m.label}</span></div>
                        <div className="card-title">{post.title}</div>
                        <div className="card-excerpt">{post.excerpt}</div>
                        <div className="card-meta">
                          <span className="card-date">{post.date}</span>
                          <span className="card-dot">•</span>
                          <span className="card-read">読む →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* カテゴリ別セクション */}
          {sections.map((cat) => {
            const m = getCatMeta(cat);
            const posts = allPosts.filter((p) => p.category === cat || (Array.isArray(p.categories) && p.categories.includes(cat)));
            if (posts.length === 0) return null;
            return (
              <div key={cat}>
                <div className="section-header">
                  <h2 className="section-title">{m.emoji} {m.label}</h2>
                  <div className="section-line" />
                  <Link href={`/category/${cat}`} className="section-more">すべて見る →</Link>
                </div>
                <div className="article-grid">
                  {posts.slice(0, 3).map((post) => <ArticleCard key={post.slug} post={post} />)}
                </div>
              </div>
            );
          })}

          {allPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✏️</div>
              <p>記事を準備中です。<br />postsフォルダに.mdxファイルを追加してください。</p>
            </div>
          )}

        </main>
        <Sidebar />
      </div>
    </>
  );
}
