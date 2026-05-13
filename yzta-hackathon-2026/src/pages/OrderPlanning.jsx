import React from 'react';
import { CalendarDays, ShoppingCart, Truck, CheckCircle2 } from 'lucide-react';

const OrderPlanning = () => {
  return (
    <div className="page-container order-planning">
      <header className="page-header">
        <div className="header-title">
          <h2>Sipariş Planlama</h2>
          <p>Yapay zeka tahminlerine dayalı gelecek dönem siparişlerinizi yönetin.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn">Yeni Plan Oluştur</button>
        </div>
      </header>

      <div className="planning-grid">
        <section className="upcoming-orders glass">
          <h3>Beklenen Teslimatlar</h3>
          <div className="order-list">
            <div className="order-card">
              <div className="order-info">
                <Truck className="truck-icon" />
                <div>
                  <h4>Global Dağıtım A.Ş.</h4>
                  <p>14 Mayıs, 09:00 - 11:00</p>
                </div>
              </div>
              <span className="status-label shipping">Yolda</span>
            </div>
            <div className="order-card">
              <div className="order-info">
                <Truck className="truck-icon" />
                <div>
                  <h4>Yerel Fırın Dünyası</h4>
                  <p>Her Gün, 06:00</p>
                </div>
              </div>
              <span className="status-label confirmed">Onaylandı</span>
            </div>
          </div>
        </section>

        <section className="ai-prediction glass">
          <div className="card-header">
            <CheckCircle2 color="var(--primary-color)" />
            <h3>AI Sipariş Önerisi</h3>
          </div>
          <p>Hafta sonu gerçekleşecek olan yerel etkinlik nedeniyle içecek talebinde <strong>%40 artış</strong> bekleniyor. Stoklarınızı bugün güncellemenizi öneririz.</p>
          <button className="secondary-btn full-width">Önerilen Listeyi Görüntüle</button>
        </section>
      </div>

      <style jsx>{`
        .order-planning { display: flex; flex-direction: column; gap: 2rem; }
        .planning-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .upcoming-orders, .ai-prediction { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .order-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .order-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--background-color); border-radius: var(--radius-lg); border: 1px solid var(--border-color); }
        .order-info { display: flex; gap: 1rem; align-items: center; }
        .truck-icon { color: var(--primary-color); }
        .status-label { font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px; }
        .status-label.shipping { background: #eff6ff; color: #2563eb; }
        .status-label.confirmed { background: #f0fdf4; color: #10b981; }
        .full-width { width: 100%; margin-top: 1rem; }
      `}</style>
    </div>
  );
};

export default OrderPlanning;
