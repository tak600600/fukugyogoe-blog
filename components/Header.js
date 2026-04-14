import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <Link href="/" className="site-logo">
          <div className="logo-icon">{siteConfig.author.avatar}</div>
          <div className="logo-text">
            <span className="logo-main">{siteConfig.name}</span>
            <span className="logo-sub">{siteConfig.tagline}</span>
          </div>
        </Link>
        <nav>
          <Link href="/category/ai" className="nav-tag ai">🤖 AI活用</Link>
          <Link href="/category/ikuji" className="nav-tag ikuji">👶 育児</Link>
          <Link href="/category/fukugyo" className="nav-tag fukugyo">💼 副業</Link>
          <Link href="/category/money" className="nav-tag money">📈 資産形成</Link>
          <Link href="/category/shikaku" className="nav-tag shikaku">📚 資格勉強</Link>
        </nav>
      </div>
    </header>
  );
}
