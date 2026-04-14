import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { notFound } from 'next/navigation';

const categoryMeta = {
  ai:      { label: 'AI活用',   emoji: '🤖', theme: 'ai-theme',      cls: 'ai'      },
  ikuji:   { label: '育児',     emoji: '👶', theme: 'ikuji-theme',   cls: 'ikuji'   },
  fukugyo: { label: '副業',     emoji: '💼', theme: 'fukugyo-theme', cls: 'fukugyo' },
  money:   { label: '資産形成', emoji: '📈', theme: 'money-theme',   cls: 'money'   },
  shikaku: { label: '資格勉強', emoji: '📚', theme: 'shikaku-theme', cls: 'shikaku' },
};

export async function generateStaticParams() {
  return Object.keys(categoryMeta).map((cat) => ({ cat }));
}

export async function generateMetadata({ params }) {
  const m = categoryMeta[params.cat];
  if (!m) return {};
  return { title: `${m.emoji} ${m.label}の記事一覧` };
}

export default function CategoryPage({ params }) {
  const m = categoryMeta[params.cat];
  if (!m) notFound();
  const posts = getAllPosts().filter((p) => p.category === params.cat || (Array.isArray(p.categories) && p.categories.includes(params.cat)));

  return (
    <div className="main-layout">
      <main>
        <div className="section-header" style={{ marginBottom: 24 }}>
          <h1 className="section-title">{m.emoji} {m.label}</h1>
          <div className="section-line" />
          <span style={{ fontSize: 13, color: 'var(--gray)' }}>{posts.length}記事</span>
        </div>
        {posts.length > 0 ? (
          <div className="article-grid">
            {posts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} className="article-card">
                <div className={`card-thumb ${m.theme}`}>
                  <span style={{ fontSize: 40 }}>{m.emoji}</span>
                </div>
                <div className="article-body">
                  <div className="card-tags"><span className={`tag ${m.cls}`}>{m.label}</span></div>
                  <div className="article-title">{post.title}</div>
                  <div className="article-meta"><span>{post.date}</span></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--gray)', textAlign: 'center', padding: '40px 0' }}>このカテゴリの記事はまだありません。</p>
        )}
      </main>
      <Sidebar />
    </div>
  );
}
