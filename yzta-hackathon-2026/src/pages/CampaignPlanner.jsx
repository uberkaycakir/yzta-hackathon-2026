import React from 'react';
import { Megaphone, Target, Users, Zap } from 'lucide-react';

const CampaignPlanner = () => {
  return (
    <div className="page-container campaign-planner">
      <header className="page-header">
        <div className="header-title">
          <h2>Kampanyalar</h2>
          <p>Müşteri sadakatini artıran ve satışları teşvik eden akıllı kampanyalar.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn">Yeni Kampanya</button>
        </div>
      </header>

      <div className="campaign-grid">
        <div className="active-campaigns glass">
          <h3>Aktif Kampanyalar</h3>
          <div className="campaign-list">
            <div className="campaign-card">
              <div className="c-info">
                <div className="c-icon"><Zap size={20} /></div>
                <div>
                  <h4>Hafta Sonu Fırın Şenliği</h4>
                  <p>Tüm unlu mamullerde %20 indirim</p>
                </div>
              </div>
              <div className="c-stats">
                <strong>%12 Artış</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="campaign-recommendation glass">
          <div className="card-header">
            <Target color="var(--primary-color)" />
            <h3>Önerilen Kampanya</h3>
          </div>
          <div className="rec-box">
            <h4>"Yoğurt & Meyve" Paketi</h4>
            <p>Son kullanma tarihi yaklaşan yoğurtları tüketmek için yanına taze meyve ekleyerek bir kombo paket oluşturun.</p>
            <div className="potential">Potansiyel Etki: <strong>+₺850 Kâr</strong></div>
          </div>
          <button className="secondary-btn full-width">Kampanyayı Başlat</button>
        </div>
      </div>

      <style jsx>{`
        .campaign-planner { display: flex; flex-direction: column; gap: 2rem; }
        .campaign-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .active-campaigns, .campaign-recommendation { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .campaign-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .campaign-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--background-color); border-radius: var(--radius-lg); border: 1px solid var(--border-color); }
        .c-info { display: flex; gap: 1rem; align-items: center; }
        .c-icon { background: var(--primary-light); color: var(--primary-color); padding: 0.5rem; border-radius: var(--radius-md); }
        .c-stats strong { color: var(--secondary-color); font-size: 0.875rem; }
        .rec-box { margin: 1.5rem 0; padding: 1.5rem; background: #fefce8; border-radius: var(--radius-lg); border: 1px solid #fef08a; }
        .rec-box h4 { color: #854d0e; margin-bottom: 0.5rem; }
        .potential { margin-top: 1rem; font-size: 0.875rem; color: #854d0e; }
        .full-width { width: 100%; margin-top: 1rem; }
      `}</style>
    </div>
  );
};

export default CampaignPlanner;
