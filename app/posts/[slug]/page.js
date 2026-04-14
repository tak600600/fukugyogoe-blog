import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const categoryMeta = {
  ai:      { label: 'AI活用',   cls: 'ai'      },
  ikuji:   { label: '育児',     cls: 'ikuji'   },
  fukugyo: { label: '副業',     cls: 'fukugyo' },
  money:   { label: '資産形成', cls: 'money'   },
  shikaku: { label: '資格勉強', cls: 'shikaku' },
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt || post.title };
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const m = categoryMeta[post.category] || { label: post.category, cls: 'ai' };

  return (
    <div className="main-layout">
      <article className="article-page" style={{ margin: 0 }}>
        <div className="article-header">
          <div className="card-tags">
            <span className={`tag ${m.cls}`}>{m.label}</span>
          </div>
          <h1 className="article-page-title">{post.title}</h1>
          <div className="article-page-meta">
            <span>{post.date}</span>
            {post.author && <span style={{ marginLeft: 12 }}>by {post.author}</span>}
          </div>
        </div>
        <div className="article-content">
          <MDXRemote source={post.content} />
        </div>
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: 700 }}>← ホームに戻る</Link>
        </div>
      </article>
      <Sidebar />
    </div>
  );
}
