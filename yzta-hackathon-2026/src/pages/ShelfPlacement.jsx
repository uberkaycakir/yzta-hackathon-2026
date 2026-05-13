import React from 'react';
import { Grid3X3, Sparkles, MapPin } from 'lucide-react';

const ShelfPlacement = () => {
  return (
    <div className="page-container shelf-placement">
      <header className="page-header">
        <div className="header-title">
          <h2>Raf Yerleşimi</h2>
          <p>Müşteri trafiği ve satış verilerine göre optimize edilmiş raf düzenleri.</p>
        </div>
      </header>

      <div className="shelf-grid">
        <section className="heatmap-card glass">
          <h3>Mağaza Isı Haritası (Trafik)</h3>
          <div className="mock-heatmap">
            <div className="heatmap-area">
              <div className="zone high">Giriş</div>
              <div className="zone medium">Kasa</div>
              <div className="zone low">Arka Reyon</div>
              <div className="zone critical">Fırın</div>
            </div>
          </div>
        </section>

        <section className="optimization-card glass">
          <div className="card-header">
            <Sparkles color="var(--primary-color)" />
            <h3>Yerleşim Optimizasyonu</h3>
          </div>
          <div className="suggestion">
            <h4>"Atıştırmalık" & "İçecek" İlişkisi</h4>
            <p>Veriler, cips alan müşterilerin %65'inin içecek de aldığını gösteriyor. Bu iki reyonu birbirine yaklaştırmanız çapraz satışı %15 artırabilir.</p>
          </div>
          <button className="primary-btn">Planogramı İndir</button>
        </section>
      </div>

      <style jsx>{`
        .shelf-placement { display: flex; flex-direction: column; gap: 2rem; }
        .shelf-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .heatmap-card, .optimization-card { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .mock-heatmap { height: 300px; background: #f3f4f6; border-radius: var(--radius-lg); margin-top: 1.5rem; position: relative; overflow: hidden; }
        .heatmap-area { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; height: 100%; gap: 4px; }
        .zone { display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; }
        .zone.high { background: rgba(239, 68, 68, 0.6); }
        .zone.medium { background: rgba(249, 115, 22, 0.6); }
        .zone.low { background: rgba(34, 197, 94, 0.6); }
        .zone.critical { background: rgba(37, 99, 235, 0.6); }
        .suggestion { margin: 1.5rem 0; padding: 1rem; background: var(--background-color); border-radius: var(--radius-lg); }
        .suggestion h4 { margin-bottom: 0.5rem; color: var(--primary-color); }
      `}</style>
    </div>
  );
};

export default ShelfPlacement;
