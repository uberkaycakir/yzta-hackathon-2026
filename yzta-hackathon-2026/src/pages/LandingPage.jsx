import React, { useState, useEffect } from 'react';
import { Sparkles, BarChart3, Package, Calendar, ShieldCheck, ArrowRight, Zap, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const LandingPage = ({ onGetStarted, onLogin }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      url: '/dashboard_preview.png',
      title: 'Akıllı Dashboard',
      desc: 'Mağazanızın tüm verileri tek bir ekranda.'
    },
    {
      url: '/dairy_shelf.png',
      title: 'AI Raf Takibi',
      desc: 'Kameralarınızla rafları gerçek zamanlı analiz edin.'
    },
    {
      url: '/bakery_shelf.png',
      title: 'Stok Tahminleme',
      desc: 'Fire oranlarını %50 oranında düşürün.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="landing-page">
      <nav className="landing-nav glass">
        <div className="logo">
          <Sparkles className="logo-icon" />
          <span>TradeMate AI</span>
        </div>
        <div className="nav-links">
          <a href="#features">Özellikler</a>
          <a href="#about">Hakkımızda</a>
          <button className="secondary-btn sm" onClick={onLogin}>Giriş Yap</button>
          <button className="primary-btn sm" onClick={onGetStarted}>Ücretsiz Başla</button>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <div className="badge animate-bounce">
            <Zap size={16} /> <span>Yapay Zeka Destekli Mağaza Yönetimi</span>
          </div>
          <h1>Mağazanızı <span>Yapay Zeka</span> ile Geleceğe Taşıyın</h1>
          <p>TradeMate AI, stok yönetiminden satış analizine, kampanya planlamasından akıllı takvime kadar her şeyi sizin yerinize düşünür. Dijital çırağınızla tanışın.</p>
          <div className="hero-cta">
            <button className="primary-btn lg" onClick={onGetStarted}>
              Hemen Başlayın <ArrowRight size={20} />
            </button>
            <button className="secondary-btn lg">
              Demo İzle <Play size={20} />
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>%35</strong> <span>Kâr Artışı</span></div>
            <div className="stat"><strong>%50</strong> <span>Daha Az Fire</span></div>
            <div className="stat"><strong>100+</strong> <span>Aktif Mağaza</span></div>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-carousel glass animate-float">
             <img src={images[currentImage].url} alt={images[currentImage].title} className="carousel-img fade-in" key={currentImage} />
             <div className="carousel-overlay">
                <h4>{images[currentImage].title}</h4>
                <p>{images[currentImage].desc}</p>
             </div>
             <div className="carousel-dots">
                {images.map((_, i) => (
                  <div key={i} className={`dot ${i === currentImage ? 'active' : ''}`} />
                ))}
             </div>
          </div>
        </div>
      </header>

      <section id="features" className="features-section">
        <div className="section-title">
          <h2>Akıllı Özellikler</h2>
          <p>Mağazanızı daha kârlı ve verimli hale getiren teknolojik çözümler.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card glass">
            <BarChart3 className="f-icon" />
            <h3>AI Satış Analizi</h3>
            <p>Geçmiş verileri analiz ederek gelecekteki satış trendlerini önceden tahmin eder.</p>
          </div>
          <div className="feature-card glass">
            <Package className="f-icon" />
            <h3>Akıllı Stok</h3>
            <p>Kritik stok seviyelerini takip eder ve otomatik sipariş önerileri sunar.</p>
          </div>
          <div className="feature-card glass">
            <Calendar className="f-icon" />
            <h3>Stratejik Takvim</h3>
            <p>Özel günleri ve bayramları takip ederek o günlere özel ticari öneriler sunar.</p>
          </div>
          <div className="feature-card glass">
            <ShieldCheck className="f-icon" />
            <h3>Güvenli Yönetim</h3>
            <p>Tüm verileriniz en üst düzey güvenlik standartları ile korunur.</p>
          </div>
        </div>
      </section>

      <section className="cta-banner glass">
        <h2>Kârınızı Artırmaya Hazır Mısınız?</h2>
        <p>TradeMate AI ile tanışan mağazalar operasyonel maliyetlerini %20 oranında düşürdü.</p>
        <button className="primary-btn lg" onClick={onGetStarted}>Hemen Üye Ol</button>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <Sparkles size={24} />
              <span>TradeMate AI</span>
            </div>
            <p>Mağaza yönetiminde yapay zeka devrimi.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Ürün</h4>
              <a href="#">Özellikler</a>
              <a href="#">Fiyatlandırma</a>
            </div>
            <div>
              <h4>Şirket</h4>
              <a href="#">Hakkımızda</a>
              <a href="#">İletişim</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 TradeMate AI. Tüm hakları saklıdır.
        </div>
      </footer>

      <style jsx>{`
        .landing-page { background: var(--background-color); color: var(--text-primary); }
        
        .landing-nav { 
          position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%); 
          width: 90%; max-width: 1200px; padding: 1rem 2rem; 
          display: flex; justify-content: space-between; align-items: center;
          border-radius: 999px; z-index: 1000;
        }
        .logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 800; font-size: 1.25rem; color: var(--primary-color); }
        .nav-links { display: flex; align-items: center; gap: 1.5rem; }
        .nav-links a { text-decoration: none; color: var(--text-secondary); font-weight: 600; font-size: 0.9rem; }

        .hero-section { 
          min-height: 100vh; padding: 10rem 5% 5rem; 
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
          background: radial-gradient(circle at top right, var(--primary-light), transparent 40%);
        }
        .hero-content h1 { font-size: 4rem; font-weight: 850; line-height: 1.1; margin-bottom: 1.5rem; }
        .hero-content h1 span { color: var(--primary-color); }
        .hero-content p { font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 2.5rem; line-height: 1.6; }
        .hero-cta { display: flex; gap: 1rem; margin-bottom: 4rem; }
        
        .badge { 
          display: inline-flex; align-items: center; gap: 0.5rem; 
          padding: 0.5rem 1rem; background: var(--primary-light); color: var(--primary-color);
          border-radius: 999px; font-weight: 700; font-size: 0.875rem; margin-bottom: 1.5rem;
        }

        .hero-stats { display: flex; gap: 3rem; }
        .stat strong { display: block; font-size: 2rem; font-weight: 850; color: var(--primary-color); }
        .stat span { font-size: 0.875rem; color: var(--text-secondary); font-weight: 600; }

        .hero-image-container { position: relative; }
        .hero-carousel { 
          aspect-ratio: 4/3; border-radius: var(--radius-xl); overflow: hidden;
          background: rgba(255, 255, 255, 0.4); position: relative;
        }
        .carousel-img { width: 100%; height: 100%; object-fit: cover; }
        .carousel-overlay { 
          position: absolute; bottom: 0; left: 0; right: 0; 
          padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          color: white;
        }
        .carousel-overlay h4 { font-size: 1.5rem; font-weight: 850; margin-bottom: 0.5rem; }
        .carousel-overlay p { font-size: 1rem; opacity: 0.9; }
        
        .carousel-dots { 
          position: absolute; top: 1.5rem; right: 1.5rem; 
          display: flex; gap: 0.5rem; 
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.4); }
        .dot.active { width: 24px; border-radius: 4px; background: white; transition: all 0.3s; }

        .fade-in { animation: fadeIn 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }

        .features-section { padding: 8rem 10%; background: var(--surface-color); }
        .section-title { text-align: center; margin-bottom: 5rem; }
        .section-title h2 { font-size: 2.5rem; font-weight: 850; margin-bottom: 1rem; }
        .section-title p { color: var(--text-secondary); font-size: 1.1rem; }

        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; }
        .feature-card { padding: 2.5rem; border-radius: var(--radius-xl); transition: transform 0.3s; }
        .feature-card:hover { transform: translateY(-10px); border-color: var(--primary-color); }
        .f-icon { width: 48px; height: 48px; color: var(--primary-color); margin-bottom: 1.5rem; }
        .feature-card h3 { margin-bottom: 1rem; font-weight: 800; }
        .feature-card p { color: var(--text-secondary); line-height: 1.6; }

        .cta-banner { 
          margin: 4rem 5% 8rem; padding: 5rem; text-align: center; border-radius: var(--radius-xl);
          background: linear-gradient(135deg, var(--primary-color), #4f46e5); color: white;
        }
        .cta-banner h2 { font-size: 3rem; font-weight: 850; margin-bottom: 1rem; }
        .cta-banner p { font-size: 1.25rem; opacity: 0.9; margin-bottom: 2.5rem; }
        .cta-banner .primary-btn { background: white; color: var(--primary-color); }

        .landing-footer { padding: 5rem 10% 2rem; border-top: 1px solid var(--border-color); }
        .footer-content { display: flex; justify-content: space-between; margin-bottom: 4rem; }
        .footer-brand p { color: var(--text-secondary); margin-top: 1rem; }
        .footer-links { display: flex; gap: 4rem; }
        .footer-links div { display: flex; flex-direction: column; gap: 1rem; }
        .footer-links a { text-decoration: none; color: var(--text-secondary); font-weight: 600; }
        .footer-bottom { text-align: center; border-top: 1px solid var(--border-color); padding-top: 2rem; color: var(--text-secondary); font-size: 0.875rem; }

        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @media (max-width: 1024px) {
          .hero-section { grid-template-columns: 1fr; text-align: center; padding-top: 8rem; }
          .hero-content h1 { font-size: 3rem; }
          .hero-cta { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-nav { width: 95%; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
