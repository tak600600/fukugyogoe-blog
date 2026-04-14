import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px'}}>
            <div className="logo-icon" style={{width:32,height:32,fontSize:16,background:'linear-gradient(135deg,#2563eb,#8b5cf6)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {siteConfig.author.avatar}
            </div>
            <span style={{color:'white',fontWeight:800,fontSize:15}}>{siteConfig.name}</span>
          </div>
          <p className="footer-desc">{siteConfig.tagline}をテーマに、30〜40代会社員の等身大の記録を発信しています。</p>
        </div>
        <div>
          <div className="footer-heading">カテゴリー</div>
          <ul className="footer-links">
            <li><Link href="/category/ai">🤖 AI活用</Link></li>
            <li><Link href="/category/ikuji">👶 育児</Link></li>
            <li><Link href="/category/fukugyo">💼 副業</Link></li>
            <li><Link href="/category/money">📈 資産形成</Link></li>
            <li><Link href="/category/shikaku">📚 資格勉強</Link></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">リンク</div>
          <ul className="footer-links">
            <li><Link href="/profile">プロフィール</Link></li>
            <li><Link href="/contact">お問い合わせ</Link></li>
            <li><Link href="/privacy-policy">プライバシーポリシー</Link></li>
            {siteConfig.social.x && <li><a href={siteConfig.social.x} target="_blank" rel="noopener noreferrer">𝕏 Twitter</a></li>}
            {siteConfig.social.note && <li><a href={siteConfig.social.note} target="_blank" rel="noopener noreferrer">note</a></li>}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
