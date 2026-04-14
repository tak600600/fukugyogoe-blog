import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { daysUntil, getAllPosts } from '@/lib/posts';

export default function Sidebar() {
  const { current, target } = siteConfig.assetTracker;
  const pct = Math.round((current / target) * 100);
  const days = daysUntil(siteConfig.examDate);
  const allPosts = getAllPosts();
  const popular = allPosts.slice(0, 4);

  const categories = [
    { key: 'ai', label: 'AI活用', emoji: '🤖' },
    { key: 'ikuji', label: '育児', emoji: '👶' },
    { key: 'fukugyo', label: '副業', emoji: '💼' },
    { key: 'money', label: '資産形成', emoji: '📈' },
    { key: 'shikaku', label: '資格勉強', emoji: '📚' },
  ];

  return (
    <aside className="sidebar">

      {/* 資産トラッカー */}
      <div className="asset-widget">
        <div className="asset-title">📊 資産トラッカー</div>
        <div className="asset-amount">¥{current.toLocaleString()}万</div>
        <div className="asset-label">目標 ¥{target.toLocaleString()}万 に向けて</div>
        <div className="asset-bar-wrap">
          <div className="asset-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="asset-target">{pct}% 達成</div>
      </div>

      {/* 診断士カウントダウン */}
      <div className="countdown-widget">
        <div className="countdown-label">📚 中小企業診断士2次試験まで</div>
        <div className="countdown-days">{days}</div>
        <div className="countdown-unit">日</div>
        <div className="countdown-exam">試験予定日: {siteConfig.examDate}</div>
      </div>

      {/* プロフィール */}
      <div className="widget profile-widget">
        <div className="widget-title">👤 運営者</div>
        <div className="profile-avatar">{siteConfig.author.avatar}</div>
        <div className="profile-name">{siteConfig.author.name}</div>
        <div className="profile-role">{siteConfig.author.role}</div>
        <div className="profile-themes">
          <span className="tag ai">AI活用</span>
          <span className="tag ikuji">育児</span>
          <span className="tag fukugyo">副業</span>
          <span className="tag shikaku">資格勉強</span>
        </div>
        <div className="profile-desc">{siteConfig.author.bio}</div>
        <div className="sns-links">
          {siteConfig.social.x && <a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" className="sns-btn x">𝕏 フォロー</a>}
          {siteConfig.social.note && <a href={siteConfig.social.note} target="_blank" rel="noopener noreferrer" className="sns-btn note">note</a>}
          {siteConfig.social.threads && <a href={siteConfig.social.threads} target="_blank" rel="noopener noreferrer" className="sns-btn threads">🧵 Threads</a>}
          {siteConfig.social.rakutenRoom && <a href={siteConfig.social.rakutenRoom} target="_blank" rel="noopener noreferrer" className="sns-btn rakuten">🛒 楽天ROOM</a>}
        </div>
      </div>

      {/* カテゴリー */}
      <div className="widget">
        <div className="widget-title">📂 カテゴリー</div>
        <div className="category-list">
          {categories.map((c) => {
            const count = allPosts.filter((p) => p.category === c.key || (Array.isArray(p.categories) && p.categories.includes(c.key))).length;
            return (
              <Link key={c.key} href={`/category/${c.key}`} className="cat-item">
                <span className="cat-left"><span>{c.emoji}</span> {c.label}</span>
                <span className="cat-count">{count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 人気記事 */}
      {popular.length > 0 && (
        <div className="widget">
          <div className="widget-title">🔥 最新記事</div>
          <ul className="popular-list">
            {popular.map((post, i) => (
              <li key={post.slug} className="popular-item">
                <span className={`popular-num${i < 3 ? ` n${i+1}` : ''}`}>{i+1}</span>
                <Link href={`/posts/${post.slug}`} className="popular-title">{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

    </aside>
  );
}
